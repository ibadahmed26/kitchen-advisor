import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { getMatchedRecipes } from "../utils/recipeMatcher";

export default function ResultsScreen({ navigation, route }) {
  const selectedIngredients = route.params?.selectedIngredients || [];
  const matchedRecipes = getMatchedRecipes(selectedIngredients);

  if (!matchedRecipes.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.emoji}>🤔</Text>
        <Text style={styles.title}>No Exact Dish Found</Text>

        <Text style={styles.subtitle}>
          Try selecting fewer ingredients, or skip some side items like masalay,
          oil, salt, etc.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Start Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🍽️</Text>
      <Text style={styles.title}>Dish Suggestions</Text>
      <Text style={styles.subtitle}>Based on your selected ingredients</Text>

      {matchedRecipes.map((recipe) => (
        <View key={recipe.id} style={styles.card}>
          <Text style={styles.recipeName}>{recipe.name}</Text>
          <Text style={styles.recipeMeta}>
            {recipe.time} • {recipe.difficulty}
          </Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Game", {
            recipes: matchedRecipes,
          })
        }
      >
        <Text style={styles.buttonText}>Start Selection Game</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.secondaryText}>Start Again</Text>
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
    fontSize: 52,
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#4A2C16",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#7A5738",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 22,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#4A2C16",
  },
  recipeMeta: {
    fontSize: 14,
    color: "#7A5738",
    marginTop: 6,
  },
  button: {
    marginTop: 18,
    backgroundColor: "#D35400",
    padding: 15,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 15,
  },
  secondaryButton: {
    marginTop: 12,
    backgroundColor: "#F3DDC5",
    padding: 15,
    borderRadius: 16,
    alignItems: "center",
  },
  secondaryText: {
    color: "#6B4423",
    fontWeight: "800",
    fontSize: 15,
  },
});