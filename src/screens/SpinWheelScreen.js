import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SpinWheelScreen({ navigation, route }) {
  const dishes = route.params?.dishes || [];
  const spinValue = useRef(new Animated.Value(0)).current;
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
    if (isSpinning || dishes.length === 0) return;

    setIsSpinning(true);
    spinValue.setValue(0);

    const randomIndex = Math.floor(Math.random() * dishes.length);
    const selectedRecipe = dishes[randomIndex];

    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3800,
      useNativeDriver: true,
    }).start(() => {
      setIsSpinning(false);

      navigation.navigate("FinalDish", {
        finalRecipe: selectedRecipe,
        recipes: [],
      });
    });
  };

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "1800deg"],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.emoji}>🎡</Text>

        <Text style={styles.title}>Dish Spinner</Text>

        <Text style={styles.subtitle}>
          Tap start and let the spinner choose today’s dish.
        </Text>

        <Animated.View
          style={[
            styles.spinnerCard,
            {
              transform: [{ rotate }],
            },
          ]}
        >
          <Text style={styles.spinnerEmoji}>🍲</Text>
          <Text style={styles.spinnerText}>
            {isSpinning ? "Spinning..." : "Ready"}
          </Text>
        </Animated.View>

        <View style={styles.dishList}>
          {dishes.map((dish, index) => (
            <View key={`${dish.id}-${index}`} style={styles.dishChip}>
              <Text style={styles.dishChipText}>{dish.name}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, isSpinning && styles.disabledButton]}
          onPress={spin}
          disabled={isSpinning}
        >
          <Text style={styles.buttonText}>
            {isSpinning ? "Spinning..." : "Start Spin"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.goBack()}
          disabled={isSpinning}
        >
          <Text style={styles.secondaryButtonText}>Edit Dishes</Text>
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
    marginBottom: 28,
    lineHeight: 22,
  },
  spinnerCard: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "#3B2415",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 8,
    borderColor: "#D35400",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 5,
  },
  spinnerEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  spinnerText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  dishList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  dishChip: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F0D6BA",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    margin: 5,
  },
  dishChipText: {
    color: "#4A2C16",
    fontWeight: "800",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#D35400",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
  secondaryButton: {
    backgroundColor: "#F3DDC5",
    paddingVertical: 15,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 12,
  },
  secondaryButtonText: {
    color: "#6B4423",
    fontSize: 15,
    fontWeight: "900",
  },
});