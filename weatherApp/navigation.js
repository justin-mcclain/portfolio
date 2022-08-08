import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import HourlyScreen from "./screens/HourlyScreen";

const Stack = createStackNavigator();

const screenOptions = {
	headerShown: false,
};

const RootNavigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="HomeScreen" screenOptions={screenOptions}>
				<Stack.Screen name="HomeScreen" component={HomeScreen} />
				<Stack.Screen name="HourlyScreen" component={HourlyScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default RootNavigation;
