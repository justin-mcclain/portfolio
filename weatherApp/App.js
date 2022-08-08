import {
	View,
	Text,
	SafeAreaView,
	StatusBar,
	ScrollView,
	Image,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	NavigationContainer,
	getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import React, { useState, useContext, createContext } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import { Icon } from "@rneui/themed";
import Hourly from "./components/Hourly";
import Forecast from "./components/Forecast";
import Favorites from "./components/Favorites";

export const AppContext = createContext();

const Tab = createBottomTabNavigator();
const screenOptions = {
	headerShown: false,
	tabBarActiveTintColor: "tomato",
	tabBarInactiveTintColor: "gray",
	tabBarStyle: {
		backgroundColor: "#1e2023",
		height: 45,
	},
};

export default function App() {
	const [loaded, setLoaded] = useState(false);
	const [checked, setChecked] = useState(true);
	const [zip, setZip] = useState("");
	const [weath, setWeath] = useState([]);
	const [recent, setRecent] = useState([]);
	const [test, setTest] = useState([]);
	const [test2, setTest2] = useState([]);
	const [weathLoc, setWeathLoc] = useState([]);
	const [searched, setSearched] = useState(false);
	const [hourData, setHourData] = useState([]);
	const [fcData, setFcData] = useState([]);
	const [moreLoad, setMoreLoad] = useState(false);
	const [graphData, setGraphData] = useState([]);
	const [airData, setAirData] = useState([]);
	const [tempColor, setTempColor] = useState("");
	const [uv, setUv] = useState("");
	const [cityWeath, setCityWeath] = useState([]);
	const [airQual, setAirQual] = useState("");
	const [formErrors, setFormErrors] = useState(false);
	const [adjust, setAdjust] = useState("");
	const [areaData, setAreaData] = useState([]);
	const [newZip, setNewZip] = useState([]);
	const [fav, setFav] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	function getHeaderTitle(route) {
		const routeName = getFocusedRouteNameFromRoute(route) ?? "TODAY";
		switch (routeName) {
			case "TODAY":
				return "Current";
			case "HOURLY":
				return "Hourly";
			case "8-DAY":
				return "Forecast";
			case "FAVORITES":
				return "Favorites";
		}
	}
	return (
		<NavigationContainer>
			<AppContext.Provider
				value={{
					loaded,
					setLoaded,
					checked,
					setChecked,
					zip,
					setZip,
					weath,
					setWeath,
					recent,
					setRecent,
					test,
					setTest,
					test2,
					setTest2,
					weathLoc,
					setWeathLoc,
					hourData,
					setHourData,
					fcData,
					setFcData,
					moreLoad,
					setMoreLoad,
					graphData,
					setGraphData,
					airData,
					setAirData,
					tempColor,
					setTempColor,
					uv,
					setUv,
					cityWeath,
					setCityWeath,
					airQual,
					setAirQual,
					formErrors,
					setFormErrors,
					adjust,
					setAdjust,
					areaData,
					setAreaData,
					newZip,
					setNewZip,
					searched,
					setSearched,
					fav,
					setFav,
					refreshing,
					setRefreshing
				}}>
				<SafeAreaView style={{ flex: 1, backgroundColor: "#1e2023" }}>
					<StatusBar style="auto" />
					<Header />
					<Tab.Navigator
						screenOptions={screenOptions}
						initialRouteName="FAVORITES">
						<Tab.Screen
							name="TODAY"
							component={Body}
							options={{
								tabBarIcon: ({ focused }) => (
									<Icon
										type="material-community"
										name="weather-sunny"
										size={25}
										color={focused ? "tomato" : "gray"}
										style={{ marginTop: 5 }}
									/>
								),
							}}
						/>
						<Tab.Screen
							name="HOURLY"
							component={Hourly}
							options={{
								tabBarIcon: ({ focused }) => (
									<Icon
										type="material-community"
										name="clock-time-three-outline"
										size={25}
										color={focused ? "tomato" : "gray"}
										style={{ marginTop: 5 }}
									/>
								),
							}}
						/>
						<Tab.Screen
							name="8-DAY"
							component={Forecast}
							options={{
								tabBarIcon: ({ focused }) => (
									<Icon
										type="material-community"
										name="calendar-month"
										size={25}
										color={focused ? "tomato" : "gray"}
										style={{ marginTop: 5 }}
									/>
								),
							}}
						/>
						<Tab.Screen
							name="FAVORITES"
							component={Favorites}
							options={{
								tabBarIcon: ({ focused }) => (
									<Icon
										type="material-community"
										name="star-outline"
										size={25}
										color={focused ? "tomato" : "gray"}
										style={{ marginTop: 5 }}
									/>
								),
							}}
						/>
					</Tab.Navigator>
				</SafeAreaView>
			</AppContext.Provider>
		</NavigationContainer>
	);
}
