import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FinalDishScreen({ navigation, route }) {
  const finalRecipe = route.params?.finalRecipe;
  const recipes = route.params?.recipes || [];

  return (
    <SafeAreaView style={styles.safeArea}>
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

        {recipes.length > 1 && !route.params?.retryUsed ? (
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() =>
              navigation.navigate("Game", {
                recipes,
                retryUsed: true,
              })
            }
          >
            <Text style={styles.secondaryButtonText}>Try One More Time</Text>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
            style={styles.button}
            onPress={() =>
                navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
                })
            }
            >
            <Text style={styles.buttonText}>Start Again</Text>
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
  container: {
    flex: 1,
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
    marginBottom: 20,
    fontWeight: "800",
  },
  secondaryButton: {
    backgroundColor: "#F3DDC5",
    paddingVertical: 15,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: "#6B4423",
    fontWeight: "900",
    fontSize: 15,
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