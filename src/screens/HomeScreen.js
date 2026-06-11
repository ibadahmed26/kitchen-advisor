import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.emoji}>🍲</Text>

        <Text style={styles.title}>Aaj Kya Pakayen?</Text>

        <Text style={styles.subtitle}>
          Daily cooking decision helper for home
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("MeatDairy", {
              selectedIngredients: [],
            })
          }
        >
          <Text style={styles.buttonText}>Start Selecting Ingredients</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Select what is available at home and we will suggest what to cook.
        </Text>
        <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("SpinSetup")}
            >
            <Text style={styles.secondaryButtonText}>Spin Custom Dishes</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Choose .your random dish
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    secondaryButton: {
  backgroundColor: "#D35400",
  paddingVertical: 16,
  paddingHorizontal: 26,
  borderRadius: 18,
  width: "100%",
  alignItems: "center",
  marginTop: 16,
  shadowColor: "#000",
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 3,
},
secondaryButtonText: {
  color: "#FFF4E6",
  fontSize: 17,
  fontWeight: "900",
},
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF4E6",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  emoji: {
    fontSize: 72,
    marginBottom: 18,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#4A2C16",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 17,
    color: "#7A5738",
    textAlign: "center",
    marginBottom: 36,
  },
  button: {
    backgroundColor: "#D35400",
    paddingVertical: 16,
    paddingHorizontal: 26,
    borderRadius: 18,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  footerText: {
    marginTop: 8,
    fontSize: 14,
    color: "#8A6A4F",
    textAlign: "center",
    lineHeight: 20,
  },
});