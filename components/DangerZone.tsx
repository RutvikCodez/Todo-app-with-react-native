import { View, Text, Alert, TouchableOpacity } from "react-native";
import React from "react";
import useTheme from "@/hooks/useTheme";
import { createSettingsStyles } from "@/assets/styles/settings.styles";
import { LinearGradient } from "expo-linear-gradient";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";

const DangerZone = () => {
  const { colors } = useTheme();
  const {
    section,
    sectionTitle,
    actionButton,
    actionLeft,
    actionIcon,
    actionTextDanger,
  } = createSettingsStyles(colors);
  const { gradients, textMuted } = colors;
  const clearAllTodos = useMutation(api.todos.clearAllTodos);

  const handleResetApp = async () => {
    Alert.alert(
      "Reset App",
      "This will delete All your todos permanently. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete All",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await clearAllTodos();
              Alert.alert(
                "App Reset",
                `Successfully deleted ${result.deletedCount} todo${result.deletedCount === 1 ? "" : "s"}. Your app has been reset.`
              );
            } catch (error) {
              console.log(error);
              Alert.alert("Error", `Failed to reset app`);
            }
          },
        },
      ]
    );
  };
  return (
    <LinearGradient colors={gradients.surface} style={section}>
      <Text style={sectionTitle}>Danger Zone</Text>
      <TouchableOpacity
        style={[actionButton, { borderBottomWidth: 0 }]}
        onPress={handleResetApp}
        activeOpacity={0.7}
      >
        <View style={actionLeft}>
          <LinearGradient style={actionIcon} colors={gradients.danger}>
            <Ionicons name="trash" size={18} color={"#fff"} />
          </LinearGradient>
          <Text style={actionTextDanger}>Reset App</Text>
        </View>
            <Ionicons name="chevron-forward" size={18} color={textMuted} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default DangerZone;
