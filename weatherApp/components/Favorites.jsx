import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	RefreshControl,
	Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { Icon } from "@rneui/themed";
import { Swipeable } from "react-native-gesture-handler";

const Favorites = ({ navigation }) => {
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
		fav,
		setFav,
		refreshing,
		setRefreshing,
		searched,
		setSearched,
		setNewZip,
	} = useContext(AppContext);
	const rightSwipe = (index) => {
		return (
			<View style={{ alignItems: "center", justifyContent: "center" }}>
				<TouchableOpacity onPress={() => removeItem(index)}>
					<Icon
						type="material-community"
						name={"delete"}
						size={35}
						color="tomato"
						style={{ marginRight: 10 }}
					/>
				</TouchableOpacity>
			</View>
		);
	};
	const removeItem = async (index) => {
		const currentData = await AsyncStorage.getItem("@storage_Key");
		const parsedData = JSON.parse(currentData);
		parsedData.splice(index, 1);
		await AsyncStorage.setItem("@storage_Key", JSON.stringify(parsedData));
		setSearched(!searched);
		console.log("REMOVED ITEM");
        rightSwipe.close();
	};
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 500);
	}, [refreshing]);
	const favWeather = (lat, lon, zip) => {
		setNewZip({ lat: lat, lon: lon, zip: zip });
		setSearched(!searched);
		navigation.jumpTo("TODAY");
	};
	useEffect(() => {}, [searched]);
	return (
		<ScrollView
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}>
			<View>
				{loaded && fav ? (
					<>
						{fav.map((city, index) => {
							return (
								<Swipeable
									key={index}
									renderRightActions={() =>
										rightSwipe(index)
									}>
									<TouchableOpacity
										onPress={() =>
											favWeather(
												city.lat,
												city.lon,
												city.zip
											)
										}>
										<View style={styles.content}>
											<View
												style={{
													flexDirection: "row",
													alignItems: "center",
												}}>
												<View>
													<View
														style={{
															flexDirection:
																"row",
															alignItems:
																"flex-end",
														}}>
														<Text
															style={{
																fontSize: 34,
															}}>
															{city.city}
														</Text>
														<Text
															style={{
																marginLeft: 5,
																marginBottom: 7,
															}}>
															({city.zip})
														</Text>
													</View>
													<View
														style={{
															flexDirection:
																"row",
														}}>
														<Text
															style={{
																fontStyle:
																	"italic",
																fontSize: 12,
															}}>
															{Math.sign(
																city.lat
															) === 1
																? city.lat.toFixed(
																		2
																  )
																: city.lat
																		.toFixed(
																			2
																		)
																		.slice(
																			1
																		)}
															{Math.sign(
																city.lat
															) === 1
																? "°N"
																: "°S"}
															,{" "}
															{Math.sign(
																city.lon
															) === 1
																? city.lon.toFixed(
																		2
																  )
																: city.lon
																		.toFixed(
																			2
																		)
																		.slice(
																			1
																		)}
															{Math.sign(
																city.lon
															) === 1
																? "°E"
																: "°W"}{" "}
														</Text>
													</View>
													{/* <View>
                                                        <Text style={{fontStyle: "italic"}}>
                                                            {city.zip}
                                                        </Text>
                                                    </View> */}
												</View>
											</View>
											<View
												style={{
													alignItems: "center",
                                                    flexDirection: 'row'
												}}>
												<View>
													<Image
														style={{
															height: 60,
															width: 60,
															resizeMode: "cover",
															flex: 1,
														}}
														source={{
															uri: `http://openweathermap.org/img/wn/${city.icon}@4x.png`,
														}}
													/>
												</View>
												<View>
                                                    <Text
                                                        style={{
                                                            fontSize: 30,
                                                            marginBottom: 5,
                                                        }}>
                                                        {city.temp}°
                                                        {checked ? "F" : "C"}
                                                    </Text>
                                                    <Text style={{ fontSize: 12 }}>
                                                        Feels like {city.feels}
                                                    </Text>
                                                </View>
											</View>
										</View>
									</TouchableOpacity>
								</Swipeable>
							);
						})}
					</>
				) : null}
			</View>
		</ScrollView>
	);
};

export default Favorites;

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flex: 1,
	},
	content: {
		flexDirection: "row",
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
});
