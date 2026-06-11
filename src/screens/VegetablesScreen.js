import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { vegetableItems } from "../data/ingredients";
import IngredientChip from "../components/IngredientChip";
import SectionCard from "../components/SectionCard";
import { getDishSuggestions } from "../utils/recipeMatcher";
import DishSuggestionCarousel from "../components/DishSuggestionCarousel";

export default function VegetablesScreen({ navigation, route }) {
  const previousSelected = route.params?.selectedIngredients || [];
  const [selectedItems, setSelectedItems] = useState([]);
  const currentSelectedIngredients = [...previousSelected, ...selectedItems];
  const suggestions = getDishSuggestions(currentSelectedIngredients, 4);

  const toggleItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const goNext = () => {
    navigation.navigate("Pulses", {
        selectedIngredients: currentSelectedIngredients,
    });
    };

  const skip = () => {
    navigation.navigate("Pulses", {
      selectedIngredients: previousSelected,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.fixedTop}>
        <DishSuggestionCarousel suggestions={suggestions} />
    </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.emoji}>🥦</Text>
        <Text style={styles.title}>Vegetables</Text>
        <Text style={styles.subtitle}>Select available vegetables at home</Text>

        <SectionCard title="Sabzi Items">
          <View style={styles.chipContainer}>
            {vegetableItems.map((item) => (
              <IngredientChip
                key={item.id}
                item={item}
                selected={selectedItems.includes(item.id)}
                onPress={() => toggleItem(item.id)}
              />
            ))}
          </View>
        </SectionCard>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.skipButton} onPress={skip}>
            <Text style={styles.skipText}>Skip Vegetables</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={goNext}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
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
    padding: 20,
    paddingBottom: 36,
  },
  emoji: {
    fontSize: 46,
    textAlign: "center",
    marginTop: 12,
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
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },
  skipButton: {
    flex: 1,
    backgroundColor: "#F3DDC5",
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
  },
  skipText: {
    color: "#6B4423",
    fontSize: 15,
    fontWeight: "700",
  },
  nextButton: {
    flex: 1,
    backgroundColor: "#D35400",
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
  },
  nextText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});