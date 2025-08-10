import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { createSettingsStyles } from "@/assets/styles/settings.styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const ProgressState = () => {
  const { colors } = useTheme();
  const {
    section,
    sectionTitle,
    statCard,
    statIconContainer,
    statIcon,
    statLabel,
    statNumber,
    statsContainer,
  } = createSettingsStyles(colors);
  const { gradients, primary, success, warning } = colors;
  const todos = useQuery(api.todos.getTodos);
  const totalTodos = todos ? todos.length : 0;
  const completedTodos = todos
    ? todos.filter((todo) => todo.isCompleted).length
    : 0;
  const activeTodos = totalTodos - completedTodos;
  return (
    <LinearGradient colors={gradients.surface} style={section}>
      <Text style={sectionTitle}>Progress Stats</Text>
      <View style={statsContainer}>
        <LinearGradient
          colors={gradients.background}
          style={[statCard, { borderLeftColor: primary }]}
        >
          <View style={statIconContainer}>
            <LinearGradient colors={gradients.primary} style={statIcon}>
              <Ionicons name="list" size={20} color={"#fff"} />
            </LinearGradient>
          </View>
          <View>
            <Text style={statNumber}>{totalTodos}</Text>
            <Text style={statLabel}>Total Todos</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={gradients.background}
          style={[statCard, { borderLeftColor: success }]}
        >
          <View style={statIconContainer}>
            <LinearGradient colors={gradients.success} style={statIcon}>
              <Ionicons name="checkmark-circle" size={20} color={"#fff"} />
            </LinearGradient>
          </View>
          <View>
            <Text style={statNumber}>{completedTodos}</Text>
            <Text style={statLabel}>Completed</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={gradients.background}
          style={[statCard, { borderLeftColor: warning }]}
        >
          <View style={statIconContainer}>
            <LinearGradient colors={gradients.warning} style={statIcon}>
              <Ionicons name="time" size={20} color={"#fff"} />
            </LinearGradient>
          </View>
          <View>
            <Text style={statNumber}>{activeTodos}</Text>
            <Text style={statLabel}>Active</Text>
          </View>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
};

export default ProgressState;
