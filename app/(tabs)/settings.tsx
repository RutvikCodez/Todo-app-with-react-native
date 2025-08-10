import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import useTheme from "@/hooks/useTheme";
import { createSettingsStyles } from "@/assets/styles/settings.styles";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ProgressState from "@/components/ProgressState";
import Preferences from "@/components/Preferences";
import DangerZone from "@/components/DangerZone";

const Settings = () => {
  const { colors } = useTheme();
  const {
    container,
    safeArea,
    header,
    titleContainer,
    iconContainer,
    title,
    scrollView,
    content,
  } = createSettingsStyles(colors);
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
        <ScrollView
          style={scrollView}
          contentContainerStyle={content}
          showsVerticalScrollIndicator={false}
        >
          <ProgressState />
          <Preferences />
          <DangerZone />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Settings;
