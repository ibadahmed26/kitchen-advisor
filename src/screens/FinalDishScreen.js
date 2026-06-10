import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function FinalDishScreen({ navigation, route }) {
  const finalRecipe = route.params?.finalRecipe;

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🏆</Text>

      <Text style={styles.title}>Aaj Ka Final Dish</Text>

      <View style={styles.card}>
        <Text style={styles.recipeEmoji}>🍲</Text>

        <Text style={styles.recipeName}>
          {finalRecipe?.name || "Dish Selected"}
        </Text>

        {finalRecipe ? (
          <Text style={styles.recipeMeta}>
            {finalRecipe.time} • {finalRecipe.difficulty}
          </Text>
        ) : null}
      </View>

      <Text style={styles.subtitle}>Bas! Aaj yeh pakayen 😄</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Start Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF4E6",
    padding: 24,
    justifyContent: "center",
  },
  emoji: {
    fontSize: 64,
    textAlign: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#4A2C16",
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 26,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#F0D6BA",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  recipeEmoji: {
    fontSize: 48,
    textAlign: "center",
    marginBottom: 12,
  },
  recipeName: {
    fontSize: 30,
    fontWeight: "900",
    color: "#D35400",
    textAlign: "center",
  },
  recipeMeta: {
    fontSize: 15,
    color: "#7A5738",
    marginTop: 10,
    textAlign: "center",
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 18,
    color: "#7A5738",
    textAlign: "center",
    marginBottom: 26,
    fontWeight: "800",
  },
  button: {
    backgroundColor: "#D35400",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
  },
});