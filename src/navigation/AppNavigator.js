import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import HomeScreen from "../screens/HomeScreen";
import MeatDairyScreen from "../screens/MeatDairyScreen";
import VegetablesScreen from "../screens/VegetablesScreen";
import PulsesScreen from "../screens/PulsesScreen";
import AccentsScreen from "../screens/AccentsScreen";
import ResultsScreen from "../screens/ResultsScreen";
import GameScreen from "../screens/GameScreen";
import FinalDishScreen from "../screens/FinalDishScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#FFF4E6",
            },
            headerTitleStyle: {
              color: "#4A2C16",
              fontWeight: "800",
            },
            headerTintColor: "#D35400",
            contentStyle: {
              backgroundColor: "#FFF4E6",
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MeatDairy"
            component={MeatDairyScreen}
            options={{ title: "Meat & Dairy" }}
          />
          <Stack.Screen
            name="Vegetables"
            component={VegetablesScreen}
            options={{ title: "Vegetables" }}
          />
          <Stack.Screen
            name="Pulses"
            component={PulsesScreen}
            options={{ title: "Daal, Rice & Grains Items" }}
          />
          <Stack.Screen
            name="Accents"
            component={AccentsScreen}
            options={{ title: "Side Ingredients" }}
          />
          <Stack.Screen
            name="Results"
            component={ResultsScreen}
            options={{ title: "Dish Suggestions" }}
          />
          <Stack.Screen
            name="Game"
            component={GameScreen}
            options={{ title: "Choose Final Dish" }}
          />
          <Stack.Screen
            name="FinalDish"
            component={FinalDishScreen}
            options={{ title: "Final Dish" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}