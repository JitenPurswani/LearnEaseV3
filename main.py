from fastapi import FastAPI, File, UploadFile
import uvicorn
import os
import fitz
import torch
from transformers import pipeline
import tempfile

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

os.environ["CUDA_LAUNCH_BLOCKING"] = "1"

device = "cuda" if torch.cuda.is_available() else "cpu"
model_name = "facebook/bart-large-cnn"  
summarizer = pipeline("summarization", model=model_name, device=0 if device == "cuda" else -1)

def extract_pdf_text(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page_num in range(doc.page_count):
        page = doc.load_page(page_num)
        text += page.get_text("text")  
    return text

def chunk_text(text, chunk_size=2000):
    chunks = []
    while len(text) > chunk_size:
        idx = text[:chunk_size].rfind(".")
        if idx == -1:
            idx = chunk_size
        chunks.append(text[:idx + 1])
        text = text[idx + 1:].strip()
    if text:
        chunks.append(text)
    return chunks

def hierarchical_summarization(text):
    chunks = chunk_text(text)
    chunk_summaries = []

    for i, chunk in enumerate(chunks):
        if chunk.strip():
            input_length = len(chunk.split())
            max_length = min(300, input_length // 2 + 50)
            max_length = min(max_length, 500)  
            if input_length < 10:
                max_length = min(50, input_length)

            try:
                summary = summarizer(chunk, max_length=max_length, min_length=50, do_sample=False)
                chunk_summaries.append(summary[0]['summary_text'])
            except Exception as e:
                print(f"Error summarizing chunk {i + 1}: {e}")

    return " ".join(chunk_summaries)
@app.post("/upload_pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        print("Request received!")
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(await file.read())
            temp_path = temp_file.name
        extracted_text = extract_pdf_text(temp_path)
        print(f"Extracted Text: {extracted_text[:500]}")  

        if not extracted_text.strip():
            return {"error": "No text found in PDF"}

        summary = hierarchical_summarization(extracted_text)

        os.remove(temp_path)

        return {"summary": summary}
    except Exception as e:
        print(f"Error during processing: {e}")
        return {"error": f"Failed to process PDF: {e}"}
