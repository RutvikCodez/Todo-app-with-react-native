import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/useTheme";
import {
  Alert,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import EmptyState from "@/components/EmptyState";

type Todo = Doc<"todos">;

export default function Index() {
  const { colors } = useTheme();
  const {
    container,
    safeArea,
    todoList,
    todoListContent,
    todoItemWrapper,
    todoItem,
    checkbox,
    checkboxInner,
    todoText,
    todoTextContainer,
    todoActions,
    actionButton,
  } = createHomeStyles(colors);
  const { statusBarStyle, gradients, border, textMuted } = colors;
  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const isLoading = todos === undefined;
  if (isLoading) return <LoadingSpinner />;
  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to toggle todo");
    }
  };

  const renderTodoItem = ({ item }: { item: Todo }) => {
    return (
      <View style={todoItemWrapper}>
        <LinearGradient
          style={todoItem}
          colors={gradients.surface}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}
          >
            <LinearGradient
              style={[
                checkboxInner,
                { borderColor: item.isCompleted ? "transparent" : border },
              ]}
              colors={item.isCompleted ? gradients.success : gradients.muted}
            >
              {item.isCompleted && (
                <Ionicons name="checkmark" size={18} color={"#fff"} />
              )}
            </LinearGradient>
          </TouchableOpacity>
          <View style={todoTextContainer}>
            <Text
              style={[
                todoText,
                item.isCompleted && {
                  textDecorationLine: "line-through",
                  color: textMuted,
                  opacity: 0.6,
                },
              ]}
            >
              {item.text}
            </Text>
            <View style={todoActions}>
              <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
                <LinearGradient colors={gradients.warning} style={actionButton}>
                  <Ionicons name="pencil" size={14} color={"#fff"} />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
                <LinearGradient colors={gradients.warning} style={actionButton}>
                  <Ionicons name="trash" size={14} color={"#fff"} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };
  return (
    <LinearGradient colors={gradients.background} style={container}>
      <StatusBar barStyle={statusBarStyle} />
      <SafeAreaView style={safeArea}>
        <Header />
        <TodoInput />
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={todoList}
          contentContainerStyle={todoListContent}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
