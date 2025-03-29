import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Svg, Circle } from "react-native-svg";

const ScoreCard = () => {
  const params = useLocalSearchParams();
  const score = params.score ? Number(params.score) : 0;
  const total = params.total ? Number(params.total) : 1;

  const percentage = total > 0 ? (score / total) * 100 : 0;
  const radius = 80; // Increased size
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.container}>
      {/* Progress Circle */}
      <View style={styles.progressContainer}>
        <Svg width="200" height="200">
          {/* Background Circle */}
          <Circle cx="100" cy="100" r={radius} stroke="#D3E0DC" strokeWidth="12" fill="none" />
          {/* Progress Circle */}
          <Circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#3B7253"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90, 100, 100)"
          />
        </Svg>
        <View style={styles.scoreTextContainer}>
          <Text style={styles.scoreLabel}>Your Score</Text>
          <Text style={styles.scoreValue}>{score}/{total}</Text>
        </View>
      </View>

      {/* Message */}
      <Text style={styles.message}>{score / total >= 0.75 ? "Congratulations!" : "Need to Work Hard"}</Text>
      <Text style={styles.subMessage}>
        {score / total >= 0.75 ? "Great Job! You Did It" : "Don't worry! You're improving, keep trying!"}
      </Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}
        onPress={() => router.push("/")}
        >Back to home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  progressContainer: { position: "relative", alignItems: "center", marginBottom: 30 },
  scoreTextContainer: { position: "absolute", alignItems: "center", top: "38%" },
  scoreLabel: { fontSize: 18, color: "#3B7253", fontWeight: "600" },
  scoreValue: { fontSize: 32, fontWeight: "bold", color: "#183D2E" },
  message: { fontSize: 26, fontWeight: "bold", color: "#183D2E", marginTop: 15 },
  subMessage: { fontSize: 16, color: "#3B7253", textAlign: "center", marginHorizontal: 30, marginTop: 8 },
  button: { backgroundColor: "#3B7253", paddingVertical: 14, paddingHorizontal: 25, borderRadius: 12, marginTop: 25 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default ScoreCard;
