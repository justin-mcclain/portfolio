import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import rainDrop from "../assets/waterdrop.svg";
import closeX from "../assets/close.svg";
import { useParams, Link } from "react-router-dom";

const Landing = () => {
	const {
		weath,
		setWeath,
		checked,
		tempColor,
		setTempColor,
		uv,
		setUv,
		cityWeath,
		setCityWeath,
		uvColor,
		setUvColor,
		setIsDesktop,
		isDesktop,
	} = useContext(AppContext);
	const { acity } = useParams();
	const updateMedia = () => {
		setIsDesktop(window.innerWidth > 900);
	};
	const [loading, setLoading] = useState(true);
	const dayjs = require("dayjs");
	var advancedFormat = require("dayjs/plugin/advancedFormat");
	dayjs.extend(advancedFormat);
	const hideAlert = () => {
		document.getElementById("alert").style.display = "none";
	};
	useEffect(() => {
		const getWeather = async () => {
			const mostRecent = JSON.parse(localStorage.getItem("rc"))[0];
			const theWeather = await (checked
				? axios.get(
						`https://api.openweathermap.org/data/2.5/onecall?lat=${mostRecent.lat}&lon=${mostRecent.lon}&exclude=minutely&units=imperial&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
				  )
				: axios.get(
						`https://api.openweathermap.org/data/2.5/onecall?lat=${mostRecent.lat}&lon=${mostRecent.lon}&exclude=minutely&units=metric&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
				  ));
			const theCity = await axios.get(
				`http://api.openweathermap.org/geo/1.0/reverse?lat=${mostRecent.lat}&lon=${mostRecent.lon}&limit=5&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
			);
			setWeath(theWeather.data);
			setCityWeath(theCity.data[0]);
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
			if (checked && theWeather.data.current.temp >= 90) {
				setTempColor("#d5202a");
			} else if (checked && theWeather.data.current.temp >= 75) {
				setTempColor("#ff8833");
			} else if (checked && theWeather.data.current.temp >= 60) {
				setTempColor("#ffb92f");
			} else if (checked && theWeather.data.current.temp >= 45) {
				setTempColor("#5b9f49");
			} else if (checked && theWeather.data.current.temp >= 30) {
				setTempColor("#15aadc");
			} else if (checked && theWeather.data.current.temp >= 15) {
				setTempColor("#0053ae");
			} else if (checked && theWeather.data.current.temp < 15) {
				setTempColor("#ac54a0");
			} else if (!checked && theWeather.data.current.temp >= 30) {
				setTempColor("#d5202a");
			} else if (!checked && theWeather.data.current.temp >= 25) {
				setTempColor("#ff8833");
			} else if (!checked && theWeather.data.current.temp >= 15) {
				setTempColor("#ffb92f");
			} else if (!checked && theWeather.data.current.temp >= 5) {
				setTempColor("#5b9f49");
			} else if (!checked && theWeather.data.current.temp >= 0) {
				setTempColor("#15aadc");
			} else if (!checked && theWeather.data.current.temp >= -10) {
				setTempColor("#0053ae");
			} else if (!checked && theWeather.data.current.temp < -10) {
				setTempColor("#ac54a0");
			}
			setLoading(false);
			window.addEventListener("resize", updateMedia);
			return () => window.removeEventListener("resize", updateMedia);
		};
		const emptyWeather = async () => {
			const theWeather = await (checked
				? axios.get(
						`https://api.openweathermap.org/data/2.5/onecall?lat=41.87&lon=-87.65&exclude=minutely&units=imperial&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
				  )
				: axios.get(
						`https://api.openweathermap.org/data/2.5/onecall?lat=41.87&lon=-87.65&exclude=minutely&units=metric&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
				  ));
			const theCity = await axios.get(
				`http://api.openweathermap.org/geo/1.0/reverse?lat=41.87&lon=-87.65&limit=5&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
			);
			setWeath(theWeather.data);
			setCityWeath(theCity.data[0]);
			if (theWeather.data.daily[0].uvi < 3) {
				setUv("Low");
			} else if (theWeather.data.daily[0].uvi < 6) {
				setUv("Moderate");
			} else if (theWeather.data.daily[0].uvi < 8) {
				setUv("High");
			} else if (theWeather.data.daily[0].uvi > 7) {
				setUv("Very High");
			}
			if (checked && theWeather.data.current.temp >= 90) {
				setTempColor("#d5202a");
			} else if (checked && theWeather.data.current.temp >= 75) {
				setTempColor("#ff8833");
			} else if (checked && theWeather.data.current.temp >= 60) {
				setTempColor("#ffb92f");
			} else if (checked && theWeather.data.current.temp >= 45) {
				setTempColor("#5b9f49");
			} else if (checked && theWeather.data.current.temp >= 30) {
				setTempColor("#15aadc");
			} else if (checked && theWeather.data.current.temp >= 15) {
				setTempColor("#0053ae");
			} else if (checked && theWeather.data.current.temp < 15) {
				setTempColor("#ac54a0");
			} else if (!checked && theWeather.data.current.temp >= 30) {
				setTempColor("#d5202a");
			} else if (!checked && theWeather.data.current.temp >= 25) {
				setTempColor("#ff8833");
			} else if (!checked && theWeather.data.current.temp >= 15) {
				setTempColor("#ffb92f");
			} else if (!checked && theWeather.data.current.temp >= 5) {
				setTempColor("#5b9f49");
			} else if (!checked && theWeather.data.current.temp >= 0) {
				setTempColor("#15aadc");
			} else if (!checked && theWeather.data.current.temp >= -10) {
				setTempColor("#0053ae");
			} else if (!checked && theWeather.data.current.temp < -10) {
				setTempColor("#ac54a0");
			}
			setLoading(false);
		};
		if (JSON.parse(localStorage.getItem("rc")) === null) {
			emptyWeather();
		} else {
			getWeather();
		}
	}, [checked]);
	return (
		<>
			{weath.alerts ? (
				<div id="alert">
					<div className="alertcontent">
						<p>
							{weath.alerts[0].tags} alert starting{" "}
							{dayjs(weath.alerts[0].start * 1000).format(
								"dddd MMMM Do h:mm A"
							)}{" "}
							until{" "}
							{dayjs(weath.alerts[0].end * 1000).format(
								"dddd MMMM Do h:mm A"
							)}
						</p>
						<img src={closeX} alt="" onClick={() => hideAlert()} />
					</div>
				</div>
			) : null}

			{loading === false ? isDesktop? (
				<div className="landing">
					<div className="landheader">
						<h1>
							{cityWeath.name}, {cityWeath.state}
						</h1>
					</div>
					<div className="content">
						<div className="current">
							<div className="currentheader">
								<h2>CURRENT</h2>
								<p>{weath.current.weather[0].main}</p>
							</div>
							<div className="currentinfo">
								<div className="icon">
									<img
										src={`http://openweathermap.org/img/wn/${weath.current.weather[0].icon}@4x.png`}
										alt=""
									/>
								</div>
								<div className="temp">
									<div className="tempnumber">
										<p>{weath.current.temp.toFixed()}</p>
										{/* <p>{checked ? "°F" : "°C"}</p> */}
									</div>
									<p>
										Feels like{" "}
										{weath.current.feels_like.toFixed()}°
										{checked ? "F" : "C"}
									</p>
								</div>
							</div>
						</div>
						<div className="today">
							<h2>TODAY</h2>
							<p>
								{dayjs(weath.current.dt * 1000).format(
									"ddd M/D"
								)}
							</p>
							<p>{weath.daily[0].weather[0].description}</p>
							<p>
								High:&nbsp;
								{weath.daily[0].temp.max.toFixed()}
								{checked ? "°F" : "°C"}
							</p>
							<p>Humidity: {weath.daily[0].humidity}%</p>
							<div className="rain">
								<p>{weath.daily[0].pop * 100}%</p>
								<img src={rainDrop} alt="" />
								{weath.daily[0].rain ? (
									<p>
										{(
											weath.daily[0].rain /
											10 /
											2.54
										).toFixed(2)}
										"
									</p>
								) : null}
							</div>
							<p>UV Index: {uv}</p>
						</div>
						<div className="tonight">
							<h2>TONIGHT</h2>
							<p>
								{dayjs(weath.current.dt * 1000).format(
									"ddd M/D"
								)}
							</p>
							<p>
								LOW
								<span
									style={{
										color: "#0d8af5",
										fontWeight: "bold",
									}}>
									{weath.daily[0].temp.min.toFixed()}
								</span>
								°{checked ? "F" : "C"}
							</p>
						</div>
					</div>
					<button><Link to={`/weather/current/${cityWeath.name}`}>Full Forecast</Link></button>
				</div>
			) : (
				<div className="mobilelanding">
					<div className="landheader">
						<h1>
							{cityWeath.name}, {cityWeath.state}
						</h1>
					</div>
					<div className="content">
						<div className="icon">
							<img
								src={`http://openweathermap.org/img/wn/${weath.current.weather[0].icon}@4x.png`}
								alt=""
							/>
							<p>{weath.current.weather[0].main}</p>
						</div>
						<div className="temp">
							<div className="tempnumber">
								<p>{weath.current.temp.toFixed()}</p>
								{/* <p>{checked ? "°F" : "°C"}</p> */}
							</div>
							<div className="feelslike">
								<p>
									Feels like {weath.current.feels_like.toFixed()}°
									{checked ? "F" : "C"}
								</p>
							</div>
						</div>
					</div>
					<button><Link to={`/weather/current/${cityWeath.name}`}>Full Forecast</Link></button>
				</div>
			) : null }
		</>
	);
};

export default Landing;
