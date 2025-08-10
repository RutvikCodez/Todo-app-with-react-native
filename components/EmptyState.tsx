import { View, Text } from "react-native";
import React from "react";
import useTheme from "@/hooks/useTheme";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const EmptyState = () => {
  const { colors } = useTheme();
  const { emptyContainer, emptyIconContainer, emptyText, emptySubtext } =
    createHomeStyles(colors);
  const { gradients, textMuted } = colors;
  return (
    <View style={emptyContainer}>
      <LinearGradient colors={gradients.empty} style={emptyIconContainer}>
        <Ionicons name="clipboard-outline" size={60} color={textMuted} />
      </LinearGradient>
      <Text style={emptyText}>No todos yet!</Text>
      <Text style={emptySubtext}>Add your first todo above to get started</Text>
    </View>
  );
};

export default EmptyState;
