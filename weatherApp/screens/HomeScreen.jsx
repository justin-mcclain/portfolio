import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	StatusBar,
	ScrollView,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import Body from "../components/Body";
import Footer from "../components/Footer";

const HomeScreen = ({navigation}) => {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="auto" />
			<Header />
			<ScrollView style={{ backgroundColor: 'white'}}>
				<Body />
			</ScrollView>
			<Footer navigation={navigation}/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1e2023",
	},
});

export default HomeScreen;
