import React, { ReactElement } from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import Welcome from "../pages/Welcome";
import UserIdentification from "../pages/UserIdentification";
import Confirmation from "../pages/Confirmation";
import Home from "../pages/Home";
import PlantSave from "../pages/PlantSave";
import MyPlants from "../pages/MyPlants";

import colors from "../styles/colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

interface Props {}

function TabRoutes(): ReactElement {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: "beside-icon",
      }}
    >
      <Tab.Screen
        name="Nova Planta"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Minhas Plantas"
        component={MyPlants}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Routes({}: Props): ReactElement {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Welcome"
        component={Welcome}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="UserIdentification"
        component={UserIdentification}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="Confirmation"
        component={Confirmation}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={TabRoutes}
      />

      <Stack.Screen
        options={({ route }) => ({
          title: "",
          headerBackTitle: "",
        })}
        name="PlantSave"
        component={PlantSave}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="MyPlants"
        component={TabRoutes}
      />
    </Stack.Navigator>
  );
}
