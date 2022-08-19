import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Keyboard,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SearchBar } from "@rneui/themed";
import { AppContext } from "../App";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Switch } from "react-native-switch";
import GetLocation from 'react-native-get-location'

const header = ({ navigation }) => {
	const toggleSwitch = () => setChecked((previousState) => !previousState);
	const dayjs = require("dayjs");
	var advancedFormat = require("dayjs/plugin/advancedFormat");
	dayjs.extend(advancedFormat);
	const {
		setChecked,
		setZip,
		zip,
		checked,
		formErrors,
		setFormErrors,
		setWeath,
		weath,
		setLoaded,
		weathLoc,
		setWeathLoc,
		graphData,
		setGraphData,
		setHourData,
		setAdjust,
		setAreaData,
		areaData,
		adjust,
		newZip,
		setNewZip,
		searched,
		setSearched,
		fav,
		setFav,
		refreshing,
		setRefreshing,
		setLowValue,
		setHighValue,
		lowValue,
		highValue,
		setAirQual,
		setUv,
	} = useContext(AppContext);
	const zipHandler = async (zip) => {
		const zipResponse = await axios
			.get(
				`http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
			)
			.catch(() => {
				setFormErrors(true);
				setZip("");
				console.log("ISSUES");
			});
		setZip("");
		setFormErrors(false);
		setNewZip(zipResponse.data);
		setSearched(!searched);
		console.log("all the way", zip, formErrors, zipResponse.data);
	};
	clearAll = async () => {
		try {
			await AsyncStorage.clear();
		} catch (e) {
			console.log(e);
		}
		console.log("Done.");
	};
	const getWeather = async () => {
		if (Object.keys(newZip).length > 0) {
			const theWeather = await axios.get(
				`https://api.openweathermap.org/data/2.5/onecall?lat=${newZip.lat}&lon=${newZip.lon}&exclude=minutely&units=imperial&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
			);
			setWeath(theWeather.data);
			const theAir = await axios.get(
				`http://api.openweathermap.org/data/2.5/air_pollution?lat=${newZip.lat}&lon=${newZip.lon}&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
			);
			const theCity = await axios.get(
				`http://api.openweathermap.org/geo/1.0/reverse?lat=${newZip.lat}&lon=${newZip.lon}&limit=5&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
			);
			setWeathLoc(theCity.data[0]);
			setLoaded(true);
			console.log("we working newZip");
			const getAdjust = () => {
				if (theWeather.data.timezone_offset === -14400) {
					return 1;
				} else if (theWeather.data.timezone_offset === -25200) {
					return -2;
				} else if (theWeather.data.timezone_offset === -21600) {
					return -1;
				} else if (theWeather.data.timezone_offset === -18000) {
					return 0;
				}
			};
			const timeAdjust = async () => {
				const adjustBy = await getAdjust();
				const hourMath = await (24 - dayjs().get("hour") - adjustBy);
				setHourData(theWeather.data.hourly.slice(1, hourMath));
				setAdjust(adjustBy);
				console.log("time adjusted");
			};
			timeAdjust();
			const theAreaData = [];
			theWeather.data.hourly.slice(0, 8).map((graph) =>
				theAreaData.push({
					time: dayjs(graph.dt * 1000)
						.add(adjust, "hour")
						.format("h A"),
					temp: Number(graph.temp.toFixed()),
				})
			);
			if (theAir.data.list[0].main.aqi === 1) {
				setAirQual("Good");
			} else if (theAir.data.list[0].main.aqi === 2) {
				setAirQual("Fair");
			} else if (theAir.data.list[0].main.aqi === 3) {
				setAirQual("Moderate");
			} else if (theAir.data.list[0].main.aqi === 4) {
				setAirQual("Poor");
			} else if (theAir.data.list[0].main.aqi === 5) {
				setAirQual("Very Poor");
			}
			if (theWeather.data.daily[0].uvi < 3) {
				setUv("Low");
				// setUvColor("#67BE4D");
			} else if (theWeather.data.daily[0].uvi < 6) {
				setUv("Moderate");
				// setUvColor("#FCBD22");
			} else if (theWeather.data.daily[0].uvi < 8) {
				setUv("High");
				// setUvColor("#F66B34");
			} else if (theWeather.data.daily[0].uvi > 7) {
				setUv("Very High") && setUvColor("#FF0000");
			}
			setAreaData(theAreaData);
			let range = theAreaData.sort((a, b) => a.temp - b.temp);
			setLowValue(range[0].temp);
			setHighValue(range[range.length - 1].temp);
			console.log("theAreaData set");
			console.log(lowValue);
			console.log(highValue);
		} else {
			const theWeather = await axios
				.get(
					`https://api.openweathermap.org/data/2.5/onecall?lat=41.8721&lon=-87.6578&exclude=minutely&units=imperial&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
				)
				.catch((err) => {
					console.log(err);
				});
			setWeath(theWeather.data);
			const theAir = await axios
				.get(
					`http://api.openweathermap.org/data/2.5/air_pollution?lat=41.8721&lon=-87.6578&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
				)
				.catch((err) => {
					console.log(err);
				});
			const theCity = await axios
				.get(
					`http://api.openweathermap.org/geo/1.0/reverse?lat=41.8721&lon=-87.6578&limit=5&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
				)
				.catch((err) => {
					console.log(err);
				});
			setWeathLoc(theCity.data[0]);
			setLoaded(true);
			console.log("we working");
			const getAdjust = () => {
				if (theWeather.data.timezone_offset === -14400) {
					return 1;
				} else if (theWeather.data.timezone_offset === -25200) {
					return -2;
				} else if (theWeather.data.timezone_offset === -21600) {
					return -1;
				} else if (theWeather.data.timezone_offset === -18000) {
					return 0;
				}
			};
			const timeAdjust = async () => {
				const adjustBy = await getAdjust();
				const hourMath = await (24 - dayjs().get("hour") - adjustBy);
				setHourData(theWeather.data.hourly.slice(1, hourMath));
				setAdjust(adjustBy);
				console.log("time adjusted");
			};
			timeAdjust();
			const theAreaData = [];
			theWeather.data.hourly.slice(0, 8).map((graph) =>
				theAreaData.push({
					time: dayjs(graph.dt * 1000)
						.add(adjust, "hour")
						.format("h A"),
					temp: Number(graph.temp.toFixed()),
				})
			);
			if (theAir.data.list[0].main.aqi === 1) {
				setAirQual("Good");
			} else if (theAir.data.list[0].main.aqi === 2) {
				setAirQual("Fair");
			} else if (theAir.data.list[0].main.aqi === 3) {
				setAirQual("Moderate");
			} else if (theAir.data.list[0].main.aqi === 4) {
				setAirQual("Poor");
			} else if (theAir.data.list[0].main.aqi === 5) {
				setAirQual("Very Poor");
			}
			if (theWeather.data.daily[0].uvi < 3) {
				setUv("Low");
				// setUvColor("#67BE4D");
			} else if (theWeather.data.daily[0].uvi < 6) {
				setUv("Moderate");
				// setUvColor("#FCBD22");
			} else if (theWeather.data.daily[0].uvi < 8) {
				setUv("High");
				// setUvColor("#F66B34");
			} else if (theWeather.data.daily[0].uvi > 7) {
				setUv("Very High") && setUvColor("#FF0000");
			}
			setAreaData(theAreaData);
			let range = theAreaData.sort((a, b) => a.temp - b.temp);
			setLowValue(range[0].temp);
			setHighValue(range[range.length - 1].temp);
			console.log(range[0]);
		}
	};
	const getData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("@storage_Key");
			const dataPromises = await Promise.all(
				JSON.parse(jsonValue).map((city) =>
					axios.get(
						`https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&exclude=minutely,hourly,daily,alerts&units=imperial&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
					)
				)
			);
			const finalData = await Promise.all(dataPromises);
			console.log(finalData[0].data.current.temp);
			const addTemp = JSON.parse(jsonValue).map((city, index) => ({
				...city,
				temp: finalData[index].data.current.temp.toFixed(),
				feels: finalData[index].data.current.feels_like.toFixed(),
				icon: finalData[index].data.current.weather[0].icon
			}));
			GetLocation.getCurrentPosition({
				enableHighAccuracy: true
			})
			.then(location => {
				console.log(location, "THIS IS WHERE I AM");
			})
			.catch(error => {
				const { code, message } = error;
				console.warn(code, message,"PROBLEM");
			})
			return jsonValue != null ? setFav(addTemp) : null;
		} catch (e) {
			console.log(e);
		}
	
	};
	useEffect(() => {
		getWeather();
		getData();
		console.log("useeffect ran");
		console.log("TESTING", newZip);
	}, [searched, refreshing]);
	return (
		<>
			<View style={styles.navBar}>
				<Image
					source={require("../assets/logo.png")}
					style={{ width: 60, height: 60 }}
				/>
				<Text style={{ color: "white", fontSize: 30 }}>Tab Name</Text>
				<Switch
					onValueChange={toggleSwitch}
					value={checked}
					activeText={"°F"}
					inActiveText={"°C"}
					backgroundActive={"#f2663c"}
					backgroundInactive={"#0d8af5"}
					circleActiveColor={"white"}
				/>
			</View>
			<View>
				<SearchBar
					platform="ios"
					placeholder="Enter Zip Code"
					inputStyle={{
						color: "white",
					}}
					inputContainerStyle={{
						height: 15,
						marginBottom: 15,
						backgroundColor: "#1e2023",
					}}
					containerStyle={{ backgroundColor: "#1e2023" }}
					onChangeText={(newZip) => setZip(newZip)}
					value={zip}
					onSubmitEditing={() => zipHandler(zip)}
				/>
			</View>
			{/* <View>
				<TouchableOpacity onPress={() => tester()}>
					<Text style={{ fontSize: 40, color: "white" }}>
						GET DATA YO
					</Text>
				</TouchableOpacity>
			</View> */}
			{/* <View>
				<TouchableOpacity onPress={() => console.log(fav)}>
					<Text style={{ fontSize: 40, color: "white" }}>
						SHOW ME FAV
					</Text>
				</TouchableOpacity>
			</View> */}
			{/* <View>
				<TouchableOpacity onPress={() => clearAll()}>
					<Text style={{ fontSize: 40, color: "white" }}>
						CLEAR THE STORAGE
					</Text>
				</TouchableOpacity>
			</View> */}
		</>
	);
};

export default header;

const styles = StyleSheet.create({
	navBar: {
		height: 100,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		padding: 10,
	},
	navText: {
		color: "white",
	},
});
