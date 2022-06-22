import axios from "axios";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { AppContext } from "../App";
import { useParams } from "react-router-dom";

const Weather = () => {
	const { weath, setWeath, checked, city } = useContext(AppContext);
	const { acity } = useParams();
	const [weathLoc, setWeathLoc] = useState([]);
	const [moreLoad, setMoreLoad] = useState(false);
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
			setWeath(theWeather.data);
			setWeathLoc(theCity.data[0]);
			setMoreLoad(true);
		};
		const noZipWeather = async () => {
			const theCity = await axios.get(
				`https://api.openweathermap.org/geo/1.0/direct?q=${acity}&limit=5&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
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
			setMoreLoad(true);
		};
		city.length > 0 ? getWeather() : noZipWeather();
	}, [checked]);
	return (
		<>
			{" "}
			{moreLoad ? (
				<div className="weather">
					{acity}
					{weath.current.temp}
					{weathLoc.name}
				</div>
			) : null}
		</>
	);
};

export default Weather;
