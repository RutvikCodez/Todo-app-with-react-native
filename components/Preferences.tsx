import { View, Text, Switch } from "react-native";
import React, { useState } from "react";
import useTheme from "@/hooks/useTheme";
import { createSettingsStyles } from "@/assets/styles/settings.styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const Preferences = () => {
  const { toggleDarkMode, isDarkMode, colors } = useTheme();
  const [isAutoSync, setIsAutoSync] = useState(true);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const {
    section,
    sectionTitle,
    settingItem,
    settingLeft,
    settingIcon,
    settingText,
  } = createSettingsStyles(colors);
  const { gradients, border, primary, warning, success } = colors;
  return (
        <LinearGradient colors={gradients.surface} style={section}>
        <Text style={sectionTitle}>Preferences</Text>
      <View style={settingItem}>
        <View style={settingLeft}>
          <LinearGradient colors={gradients.primary} style={settingIcon}>
            <Ionicons name="moon" size={18} color={"#fff"} />
          </LinearGradient>
          <Text style={settingText}>Dark Mode</Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={"#fff"}
          trackColor={{ false: border, true: primary }}
        />
      </View>
      <View style={settingItem}>
        <View style={settingLeft}>
          <LinearGradient colors={gradients.warning} style={settingIcon}>
            <Ionicons name="notifications" size={18} color={"#fff"} />
          </LinearGradient>
          <Text style={settingText}>Notifications</Text>
        </View>
        <Switch
          value={isNotificationEnabled}
          onValueChange={() => setIsNotificationEnabled(!isNotificationEnabled)}
          thumbColor={"#fff"}
          trackColor={{ false: border, true: warning }}
        />
      </View>
      <View style={settingItem}>
        <View style={settingLeft}>
          <LinearGradient colors={gradients.success} style={settingIcon}>
            <Ionicons name="notifications" size={18} color={"#fff"} />
          </LinearGradient>
          <Text style={settingText}>Auto Sync</Text>
        </View>
        <Switch
          value={isAutoSync}
          onValueChange={() => setIsAutoSync(!isAutoSync)}
          thumbColor={"#fff"}
          trackColor={{ false: border, true: success }}
        />
      </View>
    </LinearGradient>
  );
};

export default Preferences;
