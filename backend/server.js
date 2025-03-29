require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
const uploadRoutes = require("./routes/upload");
app.use("/api/upload", uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
