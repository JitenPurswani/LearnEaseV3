// REACT //
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";

// REACT NATIVE //
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";

const quizData = [
  {
    question:
      "By the time the meeting started, the team had already discussed the main points in detail. Which tense describes the action that was completed before another past event?",
    options: [
      "Present Perfect",
      "Past Perfect",
      "Past Continuous",
      "Future Perfect",
    ],
    correctOption: "Past Perfect",
  },
  {
    question: "Which sentence is in the Future Perfect tense?",
    options: [
      "She will have completed the project by next week.",
      "She is completing the project.",
      "She completes the project daily.",
      "She completed the project yesterday.",
    ],
    correctOption: "She will have completed the project by next week.",
  },
  {
    question: "Identify the sentence in Past Continuous tense.",
    options: [
      "I eat breakfast every morning.",
      "I was eating breakfast when the phone rang.",
      "I will be eating breakfast at 9 AM tomorrow.",
      "I have eaten breakfast already.",
    ],
    correctOption: "I was eating breakfast when the phone rang.",
  },
  {
    question: "Which sentence correctly uses the Past Perfect tense?",
    options: [
      "She has completed her assignment.",
      "She had completed her assignment before the deadline.",
      "She completes her assignment on time.",
      "She will have completed her assignment by tomorrow.",
    ],
    correctOption: "She had completed her assignment before the deadline.",
  },
  {
    question: "Which of the following is in the Present Continuous tense?",
    options: [
      "They were watching a movie last night.",
      "They watch movies every weekend.",
      "They are watching a movie right now.",
      "They have watched that movie before.",
    ],
    correctOption: "They are watching a movie right now.",
  },
  {
    question: "Which sentence is an example of the Simple Past tense?",
    options: [
      "She had gone to the market before I arrived.",
      "She went to the market yesterday.",
      "She is going to the market now.",
      "She has gone to the market.",
    ],
    correctOption: "She went to the market yesterday.",
  },
  {
    question: "Which sentence is in the Future Continuous tense?",
    options: [
      "I will be traveling to Paris next summer.",
      "I traveled to Paris last summer.",
      "I travel to Paris every year.",
      "I have traveled to Paris before.",
    ],
    correctOption: "I will be traveling to Paris next summer.",
  },
];


const QuizScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);

  // Timer Effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      handleNext();
    }
  }, [timer]);

  const router = useRouter(); // Initialize router

  const handleNext = () => {
    if (selectedOption === quizData[currentQuestionIndex].correctOption) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setTimer(30); // Reset timer only when moving forward
    } else {
      // Navigate to ScoreCard and pass score data
      router.push({
        pathname: "/score-card",
        params: { score: score.toString(), total: quizData.length.toString() },
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
      // Timer remains unchanged
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <TouchableOpacity
          onPress={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <Text
            style={[
              styles.previousText,
              currentQuestionIndex === 0 && styles.disabledText,
            ]}
          >
            {"< Previous"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.progressText}>
          {currentQuestionIndex + 1}/{quizData.length}
        </Text>
      </View>

      {/* Timer */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{timer}</Text>
      </View>

      {/* Question */}
      <View style={styles.questionBox}>
        <Text style={styles.questionText}>
          {quizData[currentQuestionIndex].question}
        </Text>
      </View>

      {/* Options */}
      <FlatList
        data={quizData[currentQuestionIndex].options}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption === item && styles.selectedOption,
            ]}
            onPress={() => setSelectedOption(item)}
          >
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Next/Submit Button */}
      <TouchableOpacity
        style={[styles.nextButton, !selectedOption && styles.disabledButton]}
        onPress={handleNext}
        disabled={!selectedOption}
      >
        <Text style={styles.nextButtonText}>
          {currentQuestionIndex === quizData.length - 1 ? "Submit" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FAFAFA" },

  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  previousText: { color: "#2E7D32", fontSize: 16, fontWeight: "bold" },
  disabledText: { color: "gray" }, // Style when disabled
  progressText: { fontSize: 18, fontWeight: "bold" },

  timerContainer: {
    alignSelf: "center",
    backgroundColor: "#DFF0D8",
    padding: 15,
    borderRadius: 50,
    marginBottom: 15,
  },
  timerText: { fontSize: 24, fontWeight: "bold", color: "#388E3C" },

  questionBox: {
    backgroundColor: "#DFF0D8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  questionText: { fontSize: 16, textAlign: "center", fontWeight: "600" },

  optionButton: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#4CAF50",
    marginVertical: 5,
    backgroundColor: "#F0FFF4",
  },
  selectedOption: { backgroundColor: "#A5D6A7" },
  optionText: { fontSize: 16 },

  nextButton: {
    marginTop: 20,
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  disabledButton: { backgroundColor: "#B0BEC5" },
  nextButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default QuizScreen;
