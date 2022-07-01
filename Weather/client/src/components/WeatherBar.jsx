import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { AppContext } from "../App";
import { useParams, Outlet, Link } from "react-router-dom";

const WeatherBar = () => {
	const {
		setWeath,
		checked,
		weathLoc,
		setWeathLoc,
		setHourData,
		setFcData,
		moreLoad,
		setMoreLoad,
		setGraphData,
		setAirData,
		setAirQual,
		setUv,
		setUvColor,
		setAdjust,
	} = useContext(AppContext);
	const { acity, azip, alat, alon } = useParams();
	const dayjs = require("dayjs");
	var advancedFormat = require("dayjs/plugin/advancedFormat");
	dayjs.extend(advancedFormat);
	useEffect(() => {
		const noZipWeather = async () => {
			const theCity = await axios.get(
				`http://api.openweathermap.org/geo/1.0/reverse?lat=${alat}&lon=${alon}&limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
			);
			const theAir = await axios.get(
				`http://api.openweathermap.org/data/2.5/air_pollution?lat=${alat}&lon=${alon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
			);
			const theWeather = await (checked
				? axios.get(
						`https://api.openweathermap.org/data/2.5/onecall?lat=${alat}&lon=${alon}&exclude=minutely&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
				  )
				: axios.get(
						`https://api.openweathermap.org/data/2.5/onecall?lat=${alat}&lon=${alon}&exclude=minutely&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
				  ));
			setWeath(theWeather.data);
			console.log("I DID NOT USE A ZIP CODE");
			setWeathLoc(theCity.data[0]);
			setAirData(theAir.data);
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
			};
			timeAdjust();
			setGraphData(theWeather.data.hourly);
			setFcData(theWeather.data.daily);
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
			setMoreLoad(true);
		};
noZipWeather();
	}, [checked, acity]);
	return (
		<>
			{" "}
			{moreLoad ? (
				<div className="weatherbar">
					<div className="weatherheader">
						<div className="weatherheadercontent">
							<h2>
								{weathLoc.name}, {weathLoc.state}
							</h2>
							<p>
								{Math.sign(weathLoc.lat) === 1 ? weathLoc.lat.toFixed(2) : weathLoc.lat.toFixed(2).slice(1)}
								{Math.sign(weathLoc.lat) === 1
									? "°N"
									: "°S"}, {Math.sign(weathLoc.lon) === 1 ? weathLoc.lon.toFixed(2) : weathLoc.lon.toFixed(2).slice(1)}
								{Math.sign(weathLoc.lon) === 1 ? "°E" : "°W"}
							</p>
						</div>
						<div className="weatheroptions">
							<ul>
								<li>
									<Link to={`/weather/current/${acity}/${alat}/${alon}`}>
										TODAY
									</Link>
								</li>
								<li>
									<Link to={`/weather/hourly/${acity}/${alat}/${alon}`}>
										HOURLY
									</Link>
								</li>
								<li>
									<Link to={`/weather/forecast/${acity}/${alat}/${alon}`}>
										8-DAY
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			) : null}
			<Outlet />
		</>
	);
};

export default WeatherBar;
