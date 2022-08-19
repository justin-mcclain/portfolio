import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	ScrollView,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";
import {
	VictoryArea,
	VictoryChart,
	VictoryTheme,
	VictoryAxis,
	VictoryContainer,
} from "victory-native";
import { Icon, Divider } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Body = ({ navigation }) => {
	const {
		weath,
		weathLoc,
		checked,
		moreLoad,
		graphData,
		uv,
		airQual,
		adjust,
		loaded,
		areaData,
		setAreaData,
		searched,
		setSearched,
		fav,
		setFav,
		newZip,
		refreshing,
		setRefreshing,
		lowValue,
		highValue,
	} = useContext(AppContext);
	const dayjs = require("dayjs");
	var advancedFormat = require("dayjs/plugin/advancedFormat");
	dayjs.extend(advancedFormat);
	const removeItem = async (index) => {
		const currentData = await AsyncStorage.getItem("@storage_Key");
		const parsedData = JSON.parse(currentData);
		parsedData.splice(index, 1);
		await AsyncStorage.setItem("@storage_Key", JSON.stringify(parsedData));
		setSearched(!searched);
		console.log("REMOVED ITEM");
	};
	const storeData = async (value) => {
		if (fav.some((city) => city.zip === newZip.zip)) {
			let index = fav.findIndex((city) => city.zip === newZip.zip);
			removeItem(index);
			setSearched(!searched);
		} else {
			try {
				const currentData = await AsyncStorage.getItem("@storage_Key");
				if (currentData) {
					const parsedData = JSON.parse(currentData);
					const newData = [...parsedData, value];
					await AsyncStorage.setItem(
						"@storage_Key",
						JSON.stringify(newData)
					);
					setSearched(!searched);
					console.log("added to storage");
				} else {
					await AsyncStorage.setItem(
						"@storage_Key",
						JSON.stringify([value])
					);
				}
			} catch (e) {
				console.log(e);
			}
		}
	};
	clearAll = async () => {
		try {
			await AsyncStorage.clear();
		} catch (e) {
			console.log(e);
		}
		console.log("Done.");
	};
	removeValue = async () => {
		try {
			await AsyncStorage.removeItem("@storage_key");
		} catch (e) {
			console.log(e);
		}
		console.log("Done.");
	};
	useEffect(() => {
		console.log("WHAT THE FUCK");
	}, [searched]);
	return (
		<>
			<ScrollView style={styles.container}>
				{loaded ? (
					<>
						<View style={styles.content}>
							<Text style={{ textAlign: "center", fontSize: 55 }}>
								{weathLoc.name}
							</Text>
							<View
								style={{
									flexDirection: "row",
									paddingHorizontal: 75,
									justifyContent: "space-evenly",
									alignItems: "center",
									height: 150,
									width: "100%",
								}}>
								<View
									style={{
										justifyContent: "space-between",
										height: 150,
										alignItems: "center",
										width: "100%",
									}}>
									<Text
										style={{ fontSize: 67, marginTop: 33 }}>
										{weath.current.temp.toFixed()}°
									</Text>
									<Text style={{ fontSize: 20 }}>
										Feels like{" "}
										{weath.current.feels_like.toFixed()}°
									</Text>
								</View>
								<View
									style={{
										height: 150,
										alignItems: "center",
                                        width: "100%"
									}}>
									<Image
										style={{
											height: 150,
											width: 150,
											resizeMode: "cover",
											flex: 1,
										}}
										source={{
											uri: `http://openweathermap.org/img/wn/${weath.current.weather[0].icon}@4x.png`,
										}}
									/>
									<Text
										style={{
											textTransform: "capitalize",
											fontSize: 20,
										}}>
										{weath.current.weather[0].description}
									</Text>
								</View>
							</View>
							<Divider
								style={{ width: "85%", margin: 20 }}
								color="#f2663c"
								insetType="left"
								subHeaderStyle={{}}
								width={1}
								orientation="horizontal"
							/>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-evenly",
									width: "100%",
								}}>
								<View>
									<Text style={{ fontSize: 18 }}>
										Precipitation:
									</Text>
									<Text style={{ fontSize: 18 }}>
										Humidity:
									</Text>
									<Text style={{ fontSize: 18 }}>
										Visibility:
									</Text>
									<Text style={{ fontSize: 18 }}>
										Clouds:
									</Text>
									<Text style={{ fontSize: 18 }}>
										Dew Point:
									</Text>
									<Text style={{ fontSize: 18 }}>
										UV Index:
									</Text>
									<Text style={{ fontSize: 18 }}>
										Air Quality:
									</Text>
								</View>
								<View>
									<Text style={{ fontSize: 18 }}>
										{(weath.hourly[0].pop * 100).toFixed()}%
									</Text>
									<Text style={{ fontSize: 18 }}>
										{weath.current.humidity}%
									</Text>
									<Text style={{ fontSize: 18 }}>
										{weath.current.visibility} m
									</Text>
									<Text style={{ fontSize: 18 }}>
										{weath.current.clouds}%
									</Text>
									<Text style={{ fontSize: 18 }}>
										{weath.current.dew_point.toFixed()}
										{checked ? "°F" : "°C"}
									</Text>
									<Text style={{ fontSize: 18 }}>{uv}</Text>
									<Text style={{ fontSize: 18 }}>
										{airQual}
									</Text>
								</View>
							</View>
							<Divider
								style={{ width: "85%", margin: 20 }}
								color="#f2663c"
								insetType="left"
								subHeaderStyle={{}}
								width={1}
								orientation="horizontal"
								subHeader={
									fav.some((city) => city.zip === newZip.zip)
										? "Remove from Favorites"
										: "Add to Favorites"
								}
							/>
							<TouchableOpacity
								style={{ marginTop: 5 }}
								onPress={() =>
									storeData({
										city: newZip.name,
										lat: newZip.lat,
										lon: newZip.lon,
										zip: newZip.zip,
									})
								}>
								<Icon
									type="material-community"
									name={
										fav.some(
											(city) => city.zip === newZip.zip
										)
											? "star"
											: "star-outline"
									}
									size={35}
									color="tomato"
									style={{ marginRight: 10 }}
								/>
							</TouchableOpacity>
						</View>
						{/* <View>
							<TouchableOpacity onPress={() => test()}>
								<Text style={{ fontSize: 40 }}>
									TEST SOME STUFF
								</Text>
							</TouchableOpacity>
						</View> */}
						{/* <View>
							<TouchableOpacity onPress={() => console.log(fav)}>
								<Text style={{ fontSize: 40 }}>
									LOG THE STORAGE
								</Text>
							</TouchableOpacity>
						</View> */}
						<View style={styles.content}>
							<Text style={{ fontSize: 40 }}>Temperature</Text>
							<VictoryChart
								domainPadding={{ x: 7, y: 40 }}
								height={200}
								maxDomain={{ y: highValue + 10 }}
								minDomain={{ y: lowValue - 3 }}>
								<VictoryArea
									interpolation="natural"
									style={{
										data: {
											fill: "#f1642b2e",
											fillOpacity: 0.7,
											stroke: "#f1612b",
											strokeWidth: 2,
										},
										labels: {
											fontWeight: 300,
											fontSize: 12,
										},
									}}
									labels={({ datum }) => `${datum.temp}`}
									data={areaData}
									x="time"
									y="temp"
								/>
								<VictoryAxis
									style={{
										axis: { stroke: "transparent" },
										ticks: { stroke: "transparent" },
										tickLabels: {
											fontSize: 12,
											fontWeight: "lighter",
										},
									}}
								/>
							</VictoryChart>
						</View>
					</>
				) : null}
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	content: {
		justifyContent: "space-between",
		alignItems: "center",
		margin: 10,
		padding: 15,
		backgroundColor: "white",
		marginBottom: 10,
		shadowColor: "black",
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.2,
	},
	weatherIcon: {
		justifyContent: "space-between",
		height: 150,
		alignItems: "center",
	},
});

export default Body;
