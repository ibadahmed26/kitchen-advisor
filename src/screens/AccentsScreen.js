import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { accentItems } from "../data/ingredients";
import IngredientChip from "../components/IngredientChip";
import SectionCard from "../components/SectionCard";

export default function AccentsScreen({ navigation, route }) {
  const previousSelected = route.params?.selectedIngredients || [];
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const goNext = () => {
    navigation.navigate("Results", {
      selectedIngredients: [...previousSelected, ...selectedItems],
    });
  };

  const skip = () => {
    navigation.navigate("Results", {
      selectedIngredients: previousSelected,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.emoji}>🧂</Text>
        <Text style={styles.title}>Side Ingredients</Text>
        <Text style={styles.subtitle}>
          Select masalay and common kitchen items
        </Text>

        <SectionCard title="Basic Items">
          <View style={styles.chipContainer}>
            {accentItems.map((item) => (
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
            <Text style={styles.skipText}>Skip Side Items</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={goNext}>
            <Text style={styles.nextText}>Show Dishes</Text>
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