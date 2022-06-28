import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { AppContext } from "../App";
import { useParams, Outlet, Link } from "react-router-dom";

const WeatherBar = () => {
	const {
		setWeath,
		checked,
		city,
		weathLoc,
		setWeathLoc,
		setHourData,
		setFcData,
		moreLoad,
		setMoreLoad,
		setGraphData,
		setAirData,
		setAirQual
	} = useContext(AppContext);
	const { acity } = useParams();
	const dayjs = require("dayjs");
	var advancedFormat = require("dayjs/plugin/advancedFormat");
	dayjs.extend(advancedFormat);
	const hourMath = 24 - dayjs().get("hour");
	useEffect(() => {
		const getWeather = async () => {
			const theWeather = await (checked
				? axios.get(
						`https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&exclude=minutely&units=imperial&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
				  )
				: axios.get(
						`https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&exclude=minutely&units=metric&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
				  ));
			const theCity = await axios.get(
				`http://api.openweathermap.org/geo/1.0/reverse?lat=${city.lat}&lon=${city.lon}&limit=5&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
			);
			const theAir = await axios.get(
				`http://api.openweathermap.org/data/2.5/air_pollution?lat=${city.lat}&lon=${city.lon}&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
			);
			setWeath(theWeather.data);
			setWeathLoc(theCity.data[0]);
			setAirData(theAir.data);
			setHourData(theWeather.data.hourly.slice(1, hourMath));
			setGraphData(theWeather.data.hourly);
			setFcData(theWeather.data.daily);
			if (theAir.data.list[0].main.aqi === 1) {
				setAirQual("Good")
			} else if (theAir.data.list[0].main.aqi === 2) {
				setAirQual("Fair")
			} else if (theAir.data.list[0].main.aqi === 3) {
				setAirQual("Moderate")
			} else if (theAir.data.list[0].main.aqi === 4) {
				setAirQual("Poor")
			} else if (theAir.data.list[0].main.aqi === 5) {
				setAirQual("Very Poor")
			}
			setMoreLoad(true);
		};
		const noZipWeather = async () => {
			const theCity = await axios.get(
				`https://api.openweathermap.org/geo/1.0/direct?q=${acity}&limit=5&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
			);
			const theAir = await axios.get(
				`http://api.openweathermap.org/data/2.5/air_pollution?lat=${theCity.data[0].lat}&lon=${theCity.data[0].lon}&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
			);
			const theWeather = await (checked
				? axios.get(
						`https://api.openweathermap.org/data/2.5/onecall?lat=${theCity.data[0].lat}&lon=${theCity.data[0].lon}&exclude=minutely&units=imperial&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
				  )
				: axios.get(
						`https://api.openweathermap.org/data/2.5/onecall?lat=${theCity.data[0].lat}&lon=${theCity.data[0].lon}&exclude=minutely&units=metric&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
				  ));
			setWeath(theWeather.data);
			setWeathLoc(theCity.data[0]);
			setAirData(theAir.data);
			setHourData(theWeather.data.hourly.slice(1, hourMath));
			setGraphData(theWeather.data.hourly);
			setFcData(theWeather.data.daily);
			if (theAir.data.list[0].main.aqi === 1) {
				setAirQual("Good")
			} else if (theAir.data.list[0].main.aqi === 2) {
				setAirQual("Fair")
			} else if (theAir.data.list[0].main.aqi === 3) {
				setAirQual("Moderate")
			} else if (theAir.data.list[0].main.aqi === 4) {
				setAirQual("Poor")
			} else if (theAir.data.list[0].main.aqi === 5) {
				setAirQual("Very Poor")
			}
			setMoreLoad(true);
		};
		city.length > 0 ? getWeather() : noZipWeather();
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
								{weathLoc.lat.toFixed(2)}
								{Math.sign(weathLoc.lat) === 1
									? "°N"
									: "°S"}, {weathLoc.lon.toFixed(2)}
								{Math.sign(weathLoc.lon) === 1 ? "°E" : "°W"}
							</p>
						</div>
						<div className="weatheroptions">
							<ul>
								<li>
									<Link to={`/weather/current/${acity}`}>
										TODAY
									</Link>
								</li>
								<li>
									<Link to={`/weather/hourly/${acity}`}>
										HOURLY
									</Link>
								</li>
								<li>
									<Link to={`/weather/forecast/${acity}`}>
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
