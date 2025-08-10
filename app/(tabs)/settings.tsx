import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import useTheme from "@/hooks/useTheme";
import { createSettingsStyles } from "@/assets/styles/settings.styles";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ProgressState from "@/components/ProgressState";

const Settings = () => {
  const [isAutoSync, setIsAutoSync] = useState(true);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  const { container, safeArea, header, titleContainer, iconContainer, title, scrollView, content } =
    createSettingsStyles(colors);
  const { gradients } = colors;
  return (
    <LinearGradient colors={gradients.background} style={container}>
      <SafeAreaView style={safeArea}>
        <View style={header}>
          <View style={titleContainer}>
            <LinearGradient colors={gradients.primary} style={iconContainer}>
              <Ionicons name="settings" size={28} color={"#ffffff"} />
            </LinearGradient>
            <Text style={title}>Settings</Text>
          </View>
        </View>
        <ScrollView style={scrollView} contentContainerStyle={content} showsVerticalScrollIndicator={false}>
          <ProgressState />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Settings;
