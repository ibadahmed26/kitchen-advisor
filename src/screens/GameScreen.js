import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function GameScreen({ navigation, route }) {
  const initialRecipes = route.params?.recipes || [];
  const [remainingRecipes, setRemainingRecipes] = useState(initialRecipes);

  const removeRecipe = (recipeId) => {
    const updatedRecipes = remainingRecipes.filter(
      (recipe) => recipe.id !== recipeId
    );

    if (updatedRecipes.length === 1) {
      navigation.navigate("FinalDish", {
        finalRecipe: updatedRecipes[0],
      });
      return;
    }

    setRemainingRecipes(updatedRecipes);
  };

  if (!remainingRecipes.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.emoji}>🤔</Text>
        <Text style={styles.title}>No dishes found</Text>
        <Text style={styles.subtitle}>Please start again and select ingredients.</Text>

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
      <Text style={styles.emoji}>🎮</Text>

      <Text style={styles.title}>
        {remainingRecipes.length === 3
          ? "Remove One Dish"
          : "Final Round"}
      </Text>

      <Text style={styles.subtitle}>
        Tap the dish you do not want to cook today
      </Text>

      {remainingRecipes.map((recipe) => (
        <TouchableOpacity
          key={recipe.id}
          style={styles.card}
          onPress={() => removeRecipe(recipe.id)}
        >
          <Text style={styles.recipeName}>{recipe.name}</Text>
          <Text style={styles.recipeMeta}>
            {recipe.time} • {recipe.difficulty}
          </Text>
          <Text style={styles.removeText}>Tap to remove</Text>
        </TouchableOpacity>
      ))}

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
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#F0D6BA",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  recipeName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#4A2C16",
    textAlign: "center",
  },
  recipeMeta: {
    fontSize: 14,
    color: "#7A5738",
    marginTop: 8,
    textAlign: "center",
  },
  removeText: {
    fontSize: 13,
    color: "#D35400",
    fontWeight: "800",
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 28,
    backgroundColor: "#D35400",
    padding: 15,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  secondaryButton: {
    marginTop: 16,
    backgroundColor: "#F3DDC5",
    padding: 15,
    borderRadius: 16,
    alignItems: "center",
  },
  secondaryText: {
    color: "#6B4423",
    fontWeight: "800",
  },
});