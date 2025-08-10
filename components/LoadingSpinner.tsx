import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";

const LoadingSpinner = () => {
  const { colors } = useTheme();
  const { container, loadingContainer, loadingText } = createHomeStyles(colors);
  const { primary, gradients } = colors;
  return (
    <LinearGradient colors={gradients.background} style={container}>
      <View style={loadingContainer}>
        <ActivityIndicator size={"large"} color={primary} />
        <Text style={loadingText}>Loading your todos...</Text>
      </View>
    </LinearGradient>
  );
};

export default LoadingSpinner;
