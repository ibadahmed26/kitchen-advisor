import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { recipes } from "../data/recipes";

const MAX_SELECTION = 6;

export default function SpinSetupScreen({ navigation }) {
  const [selectedDishes, setSelectedDishes] = useState([]);

  const toggleDish = (recipe) => {
    const alreadySelected = selectedDishes.some((dish) => dish.id === recipe.id);

    if (alreadySelected) {
      setSelectedDishes((prev) => prev.filter((dish) => dish.id !== recipe.id));
      return;
    }

    if (selectedDishes.length >= MAX_SELECTION) {
      Alert.alert(
        "Limit Reached",
        "You can select only 6 dishes for the spinner."
      );
      return;
    }

    setSelectedDishes((prev) => [...prev, recipe]);
  };

  const startSpin = () => {
    if (selectedDishes.length < 2) {
      Alert.alert("Select More Dishes", "Please select at least 2 dishes.");
      return;
    }

    navigation.navigate("SpinWheel", {
      dishes: selectedDishes,
    });
  };

  const goHomeFresh = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.fixedTop}>
        <Text style={styles.emoji}>🎡</Text>

        <Text style={styles.title}>Choose Spinner Dishes</Text>

        <Text style={styles.subtitle}>
          Select any 6 dishes from the list. Spinner will choose one for today.
        </Text>

        <Text style={styles.counter}>
          {selectedDishes.length}/{MAX_SELECTION} selected
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {recipes.map((recipe) => {
          const isSelected = selectedDishes.some(
            (dish) => dish.id === recipe.id
          );
          const isDisabled =
            selectedDishes.length >= MAX_SELECTION && !isSelected;

          return (
            <TouchableOpacity
              key={recipe.id}
              activeOpacity={0.8}
              disabled={isDisabled}
              onPress={() => toggleDish(recipe)}
              style={[
                styles.recipeCard,
                isSelected && styles.selectedCard,
                isDisabled && styles.disabledCard,
              ]}
            >
              <View style={styles.recipeTextArea}>
                <Text
                  style={[
                    styles.recipeName,
                    isSelected && styles.selectedRecipeName,
                    isDisabled && styles.disabledRecipeName,
                  ]}
                >
                  {recipe.name}
                </Text>

                <Text
                  style={[
                    styles.recipeMeta,
                    isSelected && styles.selectedRecipeMeta,
                    isDisabled && styles.disabledRecipeMeta,
                  ]}
                >
                  {recipe.time} • {recipe.difficulty}
                </Text>
              </View>

              <Text
                style={[
                  styles.selectBadge,
                  isSelected && styles.selectedBadge,
                  isDisabled && styles.disabledBadge,
                ]}
              >
                {isSelected ? "✓" : "+"}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={startSpin}>
          <Text style={styles.buttonText}>Go to Spinner</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={goHomeFresh}>
          <Text style={styles.secondaryButtonText}>Back to Home</Text>
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
  fixedTop: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: "#FFF4E6",
    borderBottomWidth: 1,
    borderBottomColor: "#F0D6BA",
  },
  emoji: {
    fontSize: 42,
    textAlign: "center",
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#4A2C16",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#7A5738",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 21,
  },
  counter: {
    marginTop: 10,
    textAlign: "center",
    color: "#D35400",
    fontSize: 15,
    fontWeight: "900",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 150,
  },
  recipeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F0D6BA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 7,
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: "#3B2415",
    borderColor: "#3B2415",
  },
  disabledCard: {
    opacity: 0.35,
  },
  recipeTextArea: {
    flex: 1,
    paddingRight: 12,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "900",
    color: "#4A2C16",
  },
  selectedRecipeName: {
    color: "#FFFFFF",
  },
  disabledRecipeName: {
    color: "#7A5738",
  },
  recipeMeta: {
    fontSize: 14,
    color: "#7A5738",
    marginTop: 6,
    fontWeight: "700",
  },
  selectedRecipeMeta: {
    color: "#F3DDC5",
  },
  disabledRecipeMeta: {
    color: "#8A6A4F",
  },
  selectBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F3DDC5",
    color: "#6B4423",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 22,
    fontWeight: "900",
    overflow: "hidden",
  },
  selectedBadge: {
    backgroundColor: "#D35400",
    color: "#FFFFFF",
  },
  disabledBadge: {
    backgroundColor: "#E9D8C7",
    color: "#A88566",
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 22,
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
    fontSize: 16,
    fontWeight: "900",
  },
  secondaryButton: {
    backgroundColor: "#F3DDC5",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },
  secondaryButtonText: {
    color: "#6B4423",
    fontSize: 15,
    fontWeight: "900",
  },
});