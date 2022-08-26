import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { AppContext } from "../App";
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from "@rneui/themed";

const Hourly = () => {
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
		hourData,
	} = useContext(AppContext);
	const dayjs = require("dayjs");
	var advancedFormat = require("dayjs/plugin/advancedFormat");
	dayjs.extend(advancedFormat);
	return (
		<>
			<ScrollView style={styles.container}>
				<View>
					<Text style={{fontSize: 50, textAlign: 'center'}}>Hourly Forecast</Text>
					<Text style={{textAlign: 'center', fontSize: 30, marginBottom: 10}}>{weathLoc.name}</Text>
				</View>
				{loaded
					? hourData.map((hour, index) => {
							return (
								<View key={index} style={styles.content}>
									<View style={{width: 50}}>
										<Text style={{fontSize: 18}}>
											{dayjs(hour.dt * 1000)
												.add(adjust, "hour")
												.format("h A")}
										</Text>
									</View>
									<View style={{width: 60, height: 60}}>
										<Image
											style={{
												// height: 60,
												// width: 60,
												resizeMode: "cover",
												flex: 1
											}}
											source={{
												uri: `http://openweathermap.org/img/wn/${hour.weather[0].icon}@4x.png`,
											}}
										/>
									</View>
									<Text
										style={{
											textTransform: "capitalize",
											fontSize: 18
										}}>
										{hour.weather[0].description}
									</Text>
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
										}}>
										<View>
											<Text style={{marginBottom: 2}}>
												{hour.temp.toFixed()}
												{checked ? "°F" : "°C"}
											</Text>
											<Text style={{marginBottom: 2}}>
												Feels Like&nbsp;
												{hour.feels_like.toFixed()}
												{/* {checked ? "°F" : "°C"} */}
											</Text>
											<View
												style={{
													flexDirection: "row",
													alignItems: "center",
												}}>
												<Text style={{marginBottom: 2}}>
													{(hour.pop * 100).toFixed()}{" "}
													%
												</Text>
												<Icon
													type="material-community"
													name={"water"}
													size={15}
													color="#0d8af5"
												/>
											</View>
										</View>
										<TouchableOpacity>
											<Icon
												type="material-community"
												name={"chevron-down"}
												size={25}
												color="tomato"
												style={{ marginLeft: 10 }}
											/>
										</TouchableOpacity>
									</View>
								</View>
							);
					  })
					: null}
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	content: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 10,
		marginTop: 10,
		marginBottom: 0,
		padding: 15,
		backgroundColor: "white",
		shadowColor: "black",
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.2,
	},
});

export default Hourly;
