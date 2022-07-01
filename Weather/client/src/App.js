import "./App.scss";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Recent from "./components/Recent";
import Error from "./components/Error";
import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import WeatherBar from "./components/WeatherBar";
import Weather from "./components/Weather";
import Hourly from "./components/Hourly";
import Forecast from "./components/Forecast";
import Footer from "./components/Footer";

export const AppContext = createContext();

function App() {
	const [loaded, setLoaded] = useState(false);
	const [checked, setChecked] = useState(true);
	const [zip, setZip] = useState("");
	const [city, setCity] = useState([]);
	const [weath, setWeath] = useState([]);
	const [recent, setRecent] = useState([]);
	const [test, setTest] = useState([]);
	const [test2, setTest2] = useState([]);
	const [weathLoc, setWeathLoc] = useState([]);
	const [hourData, setHourData] = useState([]);
	const [fcData, setFcData] = useState([]);
	const [moreLoad, setMoreLoad] = useState(false);
	const [graphData, setGraphData] = useState([]);
	const [airData, setAirData] = useState([]);
	const [tempColor, setTempColor] = useState("");
	const [uv, setUv] = useState("");
	const [uvColor, setUvColor] = useState("");
	const [cityWeath, setCityWeath] = useState([]);
	const [airQual, setAirQual] = useState("");
	const [formErrors, setFormErrors] = useState(false);
	const [isDesktop, setIsDesktop] = useState(window.innerWidth > 900);
	const [adjust, setAdjust] = useState("");
	return (
		<Router>
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
					city,
					setCity,
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
					isDesktop,
					setIsDesktop,
					adjust,
					setAdjust
				}}>
				<Navbar />
				<Recent />
				<div className="container">
					<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="*" element={<Error />} />
						<Route path="weather" element={<WeatherBar />}>
							<Route
								path="current/:acity/:alat/:alon"
								element={<Weather />}
							/>
							<Route path="*" element={<Error />} />
							<Route path="hourly/:acity/:alat/:alon" element={<Hourly />} />
							<Route
								path="forecast/:acity/:alat/:alon"
								element={<Forecast />}
							/>
						</Route>
					</Routes>
				</div>
				<Footer />
			</AppContext.Provider>
		</Router>
	);
}

export default App;
