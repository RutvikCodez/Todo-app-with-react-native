import { View, Text } from "react-native";
import React from "react";
import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/useTheme";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  const { colors } = useTheme();
  const {
    header,
    titleContainer,
    iconContainer,
    titleTextContainer,
    title,
    subtitle,
    progressBarContainer,
    progressContainer,
    progressBar,
    progressFill,
    progressText,
  } = createHomeStyles(colors);
  const { gradients } = colors;
  const todos = useQuery(api.todos.getTodos);
  const completedCount = todos
    ? todos.filter((todo) => todo.isCompleted).length
    : 0;
  const totalCount = todos ? todos.length : 0;
  const progressPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  return (
    <View style={header}>
      <View style={titleContainer}>
        <LinearGradient colors={gradients.primary} style={iconContainer}>
          <Ionicons name="flash-outline" size={28} color="#ffffff" />
        </LinearGradient>
        <View style={titleTextContainer}>
          <Text style={title}>Today&apos;s Tasks</Text>
          <Text style={subtitle}>
            {completedCount} of {totalCount} completed
          </Text>
        </View>
      </View>
      {totalCount > 0 && (
        <View style={progressContainer}>
          <View style={progressBarContainer}>
            <View style={progressBar}>
              <LinearGradient
                colors={gradients.success}
                style={[progressFill, { width: `${progressPercentage}%` }]}
              />
            </View>
            <Text style={progressText}>{Math.round(progressPercentage)}%</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;
