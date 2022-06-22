import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";

const Landing = () => {
	const {
		weath,
		setWeath,
		checked
	} = useContext(AppContext);
	const [tempColor, setTempColor] = useState("");
	const [loading, setLoading] = useState(true);
    const [cityWeath, setCityWeath] = useState([]);
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
            const theCity = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${mostRecent.lat}&lon=${mostRecent.lon}&limit=5&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`)
			setWeath(theWeather.data);
            setCityWeath(theCity.data[0])
			setLoading(false);
		};
		getWeather();
	}, [checked]);
	return (
		<>
			{" "}
			{loading === false ? (
				<div className="content">
                    <h2>{cityWeath.name}, {cityWeath.state}</h2>
					<div className="icon">
						<img
							src={`http://openweathermap.org/img/wn/${weath.current.weather[0].icon}@4x.png`}
							alt=""
						/>
					</div>
					<div className="currenttemp">
						<span style={{ color: tempColor }}>
							{weath.current.temp.toFixed()}°
						</span>
						<p>Feels like {weath.current.feels_like.toFixed()}°</p>
					</div>
				</div>
			) : null}
		</>
	);
};

export default Landing;
