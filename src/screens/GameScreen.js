import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function GameScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selection Game</Text>
      <Text style={styles.subtitle}>Elimination game will come here.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("FinalDish")}
      >
        <Text style={styles.buttonText}>Show Final Dish</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF4E6", padding: 24, justifyContent: "center" },
  title: { fontSize: 32, fontWeight: "800", color: "#4A2C16", textAlign: "center" },
  subtitle: { fontSize: 16, color: "#7A5738", textAlign: "center", marginTop: 10 },
  button: { marginTop: 28, backgroundColor: "#D35400", padding: 15, borderRadius: 16, alignItems: "center" },
  buttonText: { color: "#FFFFFF", fontWeight: "800" },
});