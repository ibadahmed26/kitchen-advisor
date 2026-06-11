import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getDishSuggestions } from "../utils/recipeMatcher";

export default function ResultsScreen({ navigation, route }) {
  const selectedIngredients = route.params?.selectedIngredients || [];
  const matchedRecipes = getDishSuggestions(selectedIngredients, 4);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.emoji}>🍽️</Text>

        <Text style={styles.title}>Dish Suggestions</Text>

        <Text style={styles.subtitle}>
          Based on your selected ingredients
        </Text>

        {matchedRecipes.map((recipe) => (
          <View key={recipe.id} style={styles.card}>
            <Text style={styles.recipeName}>{recipe.name}</Text>

            <Text style={styles.recipeMeta}>
              {recipe.time} • {recipe.difficulty}
            </Text>

            {recipe.matchedCount ? (
              <Text style={styles.matchText}>
                {recipe.matchedCount} matched ingredients
              </Text>
            ) : null}
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomBar}>
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
          onPress={() =>
            navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
            })
            }
        >
          <Text style={styles.secondaryText}>Start Again</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF4E6",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 170,
  },
  emoji: {
    fontSize: 52,
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
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
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  recipeName: {
    fontSize: 22,
    fontWeight: "900",
    color: "#4A2C16",
  },
  recipeMeta: {
    fontSize: 15,
    color: "#7A5738",
    marginTop: 8,
  },
  matchText: {
    fontSize: 13,
    color: "#D35400",
    fontWeight: "800",
    marginTop: 8,
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 18,
    backgroundColor: "#FFF4E6",
    borderTopWidth: 1,
    borderTopColor: "#F0D6BA",
  },
  button: {
    backgroundColor: "#D35400",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 10,
    backgroundColor: "#F3DDC5",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  secondaryText: {
    color: "#6B4423",
    fontWeight: "900",
    fontSize: 15,
  },
});