import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function GameScreen({ navigation, route }) {
  const recipes = route.params?.recipes || [];

  const [cards, setCards] = useState(recipes);
  const [phase, setPhase] = useState("preview"); // preview | pick
  const flipAnim = useRef(new Animated.Value(0)).current;
  const retryUsed = route.params?.retryUsed || false;

  const startShuffle = () => {
    Animated.timing(flipAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setCards(shuffleArray(recipes));
      setPhase("pick");
    });
  };

  const pickCard = (recipe) => {
    navigation.navigate("FinalDish", {
      finalRecipe: recipe,
      recipes,
      retryUsed,
    });
  };

  const frontRotate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const backRotate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  if (!recipes.length) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emoji}>🤔</Text>
          <Text style={styles.title}>No dishes available</Text>
          <Text style={styles.subtitle}>Please start again and select ingredients.</Text>

          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
                })}
          >
            <Text style={styles.mainButtonText}>Start Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.emoji}>{phase === "preview" ? "👀" : "🎴"}</Text>

        <Text style={styles.title}>
          {phase === "preview" ? "Remember These Dishes" : "Pick One Card"}
        </Text>

        <Text style={styles.subtitle}>
          {phase === "preview"
            ? "These are your possible dishes. Now shuffle them."
            : "Choose one mystery card for today’s dish."}
        </Text>

        <View style={styles.cardsGrid}>
          {cards.map((recipe, index) => (
            <TouchableOpacity
              key={`${recipe.id}-${index}`}
              activeOpacity={phase === "pick" ? 0.8 : 1}
              disabled={phase !== "pick"}
              onPress={() => pickCard(recipe)}
              style={styles.cardWrapper}
            >
              {phase === "preview" ? (
                <Animated.View
                  style={[
                    styles.card,
                    styles.frontCard,
                    { transform: [{ rotateY: frontRotate }] },
                  ]}
                >
                  <Text style={styles.cardEmoji}>🍲</Text>
                  <Text style={styles.recipeName}>{recipe.name}</Text>
                  <Text style={styles.recipeMeta}>
                    {recipe.time} • {recipe.difficulty}
                  </Text>
                </Animated.View>
              ) : (
                <Animated.View
                  style={[
                    styles.card,
                    styles.backCard,
                    { transform: [{ rotateY: backRotate }] },
                  ]}
                >
                  <Text style={styles.cardEmoji}>❓</Text>
                  <Text style={styles.mysteryText}>Mystery Dish</Text>
                  <Text style={styles.pickText}>Tap to reveal</Text>
                </Animated.View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {phase === "preview" ? (
          <TouchableOpacity style={styles.mainButton} onPress={startShuffle}>
            <Text style={styles.mainButtonText}>Flip & Shuffle Cards</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => {
              setPhase("preview");
              setCards(recipes);
              flipAnim.setValue(0);
            }}
          >
            <Text style={styles.secondaryButtonText}>Show Dishes Again</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.homeButtonText}>Start Again</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF4E6",
  },
  container: {
    padding: 6,
    paddingBottom: 26,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: "#FFF4E6",
    padding: 24,
    justifyContent: "center",
  },
  emoji: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
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
  cardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  cardWrapper: {
    width: "48%",
    marginBottom: 14,
  },
  card: {
    minHeight: 170,
    borderRadius: 22,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  frontCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F0D6BA",
  },
  backCard: {
    backgroundColor: "#3B2415",
  },
  cardEmoji: {
    fontSize: 36,
    marginBottom: 10,
  },
  recipeName: {
    fontSize: 19,
    fontWeight: "900",
    color: "#4A2C16",
    textAlign: "center",
  },
  recipeMeta: {
    fontSize: 13,
    color: "#7A5738",
    marginTop: 8,
    textAlign: "center",
    fontWeight: "700",
  },
  mysteryText: {
    fontSize: 19,
    fontWeight: "900",
    color: "#FFFFFF",
    textAlign: "center",
  },
  pickText: {
    fontSize: 13,
    color: "#FFB86B",
    marginTop: 8,
    fontWeight: "800",
  },
  mainButton: {
    backgroundColor: "#D35400",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 8,
  },
  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
  secondaryButton: {
    backgroundColor: "#F3DDC5",
    paddingVertical: 15,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 8,
  },
  secondaryButtonText: {
    color: "#6B4423",
    fontSize: 15,
    fontWeight: "900",
  },
  homeButton: {
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  homeButtonText: {
    color: "#7A5738",
    fontSize: 15,
    fontWeight: "800",
  },
});