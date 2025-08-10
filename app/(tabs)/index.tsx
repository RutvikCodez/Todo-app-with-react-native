import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/useTheme";
import { StatusBar, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();
  const { container, safeArea } = createHomeStyles(colors);
  const { statusBarStyle, gradients } = colors;
  return (
    <LinearGradient colors={gradients.background} style={container}>
      <StatusBar barStyle={statusBarStyle} />
      <SafeAreaView style={safeArea}>
        <Header />
        <TodoInput />
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text>Toggle the mode</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}
