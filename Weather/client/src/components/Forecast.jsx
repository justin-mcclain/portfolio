import React from "react";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import { useParams } from "react-router-dom";
import rainDrop from "../assets/waterdrop.svg";

const Forecast = () => {
	const {
		weath,
		setWeath,
		checked,
		city,
		weathLoc,
		setWeathLoc,
		fcData,
		moreLoad,
	} = useContext(AppContext);
	const { acity } = useParams();
	const dayjs = require("dayjs");
	var advancedFormat = require("dayjs/plugin/advancedFormat");
	dayjs.extend(advancedFormat);
	return (
		<>
			<div className="header">
                <h2>8-Day Forecast</h2>
            </div>
			<div className="forecast">
				{fcData.map((day, index) => {
					return (
						<div className="daycast" key={index}>
							<h3>{dayjs(day.dt * 1000).format("ddd M/D")}</h3>
                            <div className="daycasttemps">
                                <p>{day.temp.max.toFixed()}°</p>&nbsp;|&nbsp;
                                <p>{day.temp.min.toFixed()}°</p>{checked ? "F" : "C"}
                            </div>
							<img
								src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`}
								alt=""
							/>
							<p>{day.weather[0].description}</p>
                            <div className="rain">
								<p>{day.pop}%</p>
								<img src={rainDrop} alt="" />
								{day.rain ? (
									<p>
										{(
											day.rain /
											10 /
											2.54
										).toFixed(2)}
										"
									</p>
								) : null}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Forecast;
