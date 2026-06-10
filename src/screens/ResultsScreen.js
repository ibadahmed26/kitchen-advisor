import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ResultsScreen({ navigation, route }) {
  const selectedIngredients = route.params?.selectedIngredients || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dish Suggestions</Text>
      <Text style={styles.subtitle}>
        Results will be filtered here.
      </Text>

      <Text style={styles.debug}>
        Selected: {selectedIngredients.join(", ") || "None"}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Game")}
      >
        <Text style={styles.buttonText}>Start Selection Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF4E6", padding: 24, justifyContent: "center" },
  title: { fontSize: 32, fontWeight: "800", color: "#4A2C16", textAlign: "center" },
  subtitle: { fontSize: 16, color: "#7A5738", textAlign: "center", marginTop: 10 },
  debug: { marginTop: 20, color: "#6B4423", textAlign: "center" },
  button: { marginTop: 28, backgroundColor: "#D35400", padding: 15, borderRadius: 16, alignItems: "center" },
  buttonText: { color: "#FFFFFF", fontWeight: "800" },
});