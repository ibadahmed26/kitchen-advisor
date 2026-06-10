import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function IngredientChip({ item, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.selectedChip]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, selected && styles.selectedChipText]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderColor: "#E0B58A",
    backgroundColor: "#FFF8EF",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 10,
  },
  selectedChip: {
    backgroundColor: "#D35400",
    borderColor: "#D35400",
  },
  chipText: {
    color: "#6B4423",
    fontSize: 15,
    fontWeight: "600",
  },
  selectedChipText: {
    color: "#FFFFFF",
  },
});