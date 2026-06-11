import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function DishSuggestionCarousel({ suggestions = [] }) {
  if (!suggestions.length) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Live Suggestions</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      >
        {suggestions.map((recipe, index) => {
          const isFirst = index === 0;

          return (
            <View
              key={recipe.id}
              style={[
                styles.card,
                isFirst ? styles.mainCard : styles.fadedCard,
              ]}
            >
              <Text style={styles.emoji}>{isFirst ? "🔥" : "🍲"}</Text>

              <Text
                style={[
                  styles.recipeName,
                  isFirst ? styles.mainRecipeName : styles.fadedRecipeName,
                ]}
              >
                {recipe.name}
              </Text>

              <Text
                style={[
                  styles.recipeMeta,
                  isFirst ? styles.mainMeta : styles.fadedMeta,
                ]}
              >
                {recipe.time} • {recipe.difficulty}
              </Text>

              {recipe.matchedCount ? (
                <Text
                  style={[
                    styles.matchText,
                    isFirst ? styles.mainMatchText : styles.fadedMatchText,
                  ]}
                >
                  {recipe.matchedCount} matched
                </Text>
              ) : null}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
  },
  heading: {
    fontSize: 16,
    fontWeight: "900",
    color: "#4A2C16",
    marginBottom: 10,
    marginLeft: 10
  },
  carousel: {
    paddingRight: 20,
    paddingLeft: 10
  },
  card: {
    borderRadius: 22,
    padding: 16,
    marginRight: 12,
    minHeight: 145,
    justifyContent: "center",
  },
  mainCard: {
    width: 230,
    backgroundColor: "#3B2415",
  },
  fadedCard: {
    width: 170,
    backgroundColor: "#FFFFFF",
    opacity: 0.55,
    borderWidth: 1,
    borderColor: "#F0D6BA",
  },
  emoji: {
    fontSize: 30,
    marginBottom: 8,
  },
  recipeName: {
    fontWeight: "900",
  },
  mainRecipeName: {
    fontSize: 22,
    color: "#FFFFFF",
  },
  fadedRecipeName: {
    fontSize: 17,
    color: "#4A2C16",
  },
  recipeMeta: {
    marginTop: 8,
    fontWeight: "700",
  },
  mainMeta: {
    color: "#F3DDC5",
  },
  fadedMeta: {
    color: "#7A5738",
    fontSize: 12,
  },
  matchText: {
    marginTop: 10,
    fontWeight: "900",
  },
  mainMatchText: {
    color: "#FFB86B",
  },
  fadedMatchText: {
    color: "#D35400",
    fontSize: 12,
  },
});