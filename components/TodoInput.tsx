import { View, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import useTheme from "@/hooks/useTheme";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const TodoInput = () => {
  const { colors } = useTheme();
  const { inputSection, inputWrapper, input, addButton, addButtonDisabled } =
    createHomeStyles(colors);
  const { textMuted, gradients } = colors;
  const [newTodo, setNewTodo] = useState("");
  const addTodo = useMutation(api.todos.addTodo);
  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        await addTodo({
          text: newTodo.trim(),
        });
        setNewTodo("");
      } catch (error) {
        console.log(error);``
        Alert.alert("Error", "Failed to add todo");
      }
    }
  };
  return (
    <View style={inputSection}>
      <View style={inputWrapper}>
        <TextInput
          style={input}
          placeholder="What needs to be done?"
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
          placeholderTextColor={textMuted}
        />
        <TouchableOpacity
          onPress={handleAddTodo}
          activeOpacity={0.8}
          disabled={!newTodo.trim()}
        >
          <LinearGradient
            colors={newTodo.trim() ? gradients.primary : gradients.muted}
            style={[addButton, !newTodo.trim() && addButtonDisabled]}
          >
            <Ionicons name="add" size={24} color={"#ffffff"} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoInput;
