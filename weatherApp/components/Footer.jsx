import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";

const Footer = ({navigation}) => {
	return (
		<View style={styles.container}>
			<View style={styles.icons}>
				<TouchableOpacity>
					<Icon
						type="material-community"
						name="weather-sunny"
						size={30}
						color="white"
					/>
					<Text style={{ color: 'white', marginVertical: 5, fontSize: 12 }}>TODAY</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate("HourlyScreen")}>
					<Icon
						type="material-community"
						name="clock-time-three-outline"
						size={30}
						color="white"
					/>
					<Text style={{ color: 'white', marginVertical: 5, fontSize: 12 }}>HOURLY</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Icon
						type="material-community"
						name="calendar-month"
						size={30}
						color="white"
					/>
					<Text style={{ color: 'white', marginVertical: 5, fontSize: 12 }}>8-DAY</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Icon
						type="material-community"
						name="star-outline"
						size={30}
						color="white"
					/>
					<Text style={{ color: 'white', marginVertical: 5, fontSize: 12 }}>8-DAY</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 75,
		flexDirection: "row",
		justifyContent: 'center',
	},
	icons: {
		flexDirection: 'row',
		width: '65%',
		justifyContent: 'space-between',
		marginTop: 15,
	},
	icon: {

	}
});

export default Footer;
