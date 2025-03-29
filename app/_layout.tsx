// app/_layout.tsx
import React from "react";
import { View } from "react-native";
import Navbar from "../components/Navbar";
import TabLayout from "./(tabs)/_layout";
import { Stack } from "expo-router";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true);

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        <Stack.Screen
          name="quiz"
          options={{
            headerBackTitle: "Summary",
            headerTintColor: "#2E7D32"
          }}
        />
      </Stack>
    </View>
  );
}
