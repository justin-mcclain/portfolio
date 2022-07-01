import React from "react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import rainDrop from "../assets/waterdrop.svg";

const Hourly = () => {
	const { checked, hourData, moreLoad, isDesktop, setIsDesktop, setAdjust, adjust } =
		useContext(AppContext);
	const updateMedia = () => {
		setIsDesktop(window.innerWidth > 900);
	};
	const dayjs = require("dayjs");
	var advancedFormat = require("dayjs/plugin/advancedFormat");
	dayjs.extend(advancedFormat);
	
	useEffect(() => {
		window.addEventListener("resize", updateMedia);
		return () => window.removeEventListener("resize", updateMedia);
	}, []);
	return (
		<>
			<div className="hourly">
				<div className="header">
					<h2>Hourly Forecast</h2>
				</div>
				{isDesktop ? (
					<table>
						<thead className="rowgroup">
							<tr>
								<th>Time</th>
								<th>Conditions</th>
								<th>Temp</th>
								<th>Feels Like</th>
								<th>Precip</th>
								<th>Amount</th>
								<th>Cloud Cover</th>
								<th>Dew Point</th>
								<th>Humidity</th>
								<th>Wind</th>
							</tr>
						</thead>
						<tbody className="rowgroup">
							{moreLoad
								? hourData.map((hour, index) => {
										return (
											<tr key={index}>
												<td>
													{dayjs(
														hour.dt * 1000
													).add(adjust, "hour").format("h:mm A")}
												</td>
												<td className="desc">
													<img
														src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
														alt=""
													/>
													{
														hour.weather[0]
															.description
													}
												</td>
												<td>
													{hour.temp.toFixed()}
													{checked ? "°F" : "°C"}
												</td>
												<td>
													{hour.feels_like.toFixed()}
													{checked ? "°F" : "°C"}
												</td>
												<td>{hour.pop} %</td>
												{hour.rainy ? (
													<td>
														{hour.rain["1h"]} in
													</td>
												) : (
													<td>0 in</td>
												)}
												<td>{hour.clouds}%</td>
												<td>
													{hour.dew_point.toFixed()}
													{checked ? "°F" : "°C"}
												</td>
												<td>{hour.humidity}%</td>
												<td>
													{hour.wind_speed.toFixed()}{" "}
													{checked ? "mph" : "km/h"}{" "}
												</td>
											</tr>
										);
								  })
								: null}
						</tbody>
					</table>
				) : (
					hourData.map((hour, index) => {
						return (
							<div className="mobilehourly" key={index}>
								<div className="content">
									<div className="content-left">
										{dayjs(hour.dt * 1000).add(adjust, "hour").format("h A")}
										<img
											src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
											alt=""
										/>
									</div>
									<div className="content-right">
										<p>{hour.weather[0].description}</p>
										<p>
											{hour.temp.toFixed()}
											{checked ? "°F" : "°C"}
										</p>
										<p>
											Feels Like&nbsp;
											{hour.feels_like.toFixed()}
											{checked ? "°F" : "°C"}
										</p>
										<p>
											<img src={rainDrop} alt="" />{" "}
											{hour.pop} %
										</p>
									</div>
									<div className="expand-content">
										<svg
											className="icon-chevron  arrow js-dropdown-toggle"
											xmlns="http://www.w3.org/2000/svg"
											width="10"
											height="6"
											viewBox="0 0 10 6"
											role="img"
											aria-labelledby="chevronSVG">
											<title id="chevronSVG">
												Chevron down
											</title>
											<path d="M10 .969L9.037 0 5 4.063.963 0 0 .969 5 6z"></path>
										</svg>
									</div>
								</div>
								<div className="extra-content">
									<div className="extra-content-left">
										<div className="extra-content-left-upper">
											<p>Cloud Cover</p>
											<p>{hour.clouds}%</p>
										</div>
										<div className="extra-content-left-lower">
											<p>Dew Point</p>
											<p>
												{hour.dew_point.toFixed()}
												{checked ? "°F" : "°C"}
											</p>
										</div>
									</div>
									<div className="extra-content-right">
										<div className="extra-content-right-upper">
											<p>Humidity</p>
											<p>{hour.humidity}%</p>
										</div>
										<div className="extra-content-right-lower">
											<p>Wind</p>
											<p>
												{hour.wind_speed.toFixed()}{" "}
												{checked ? "mph" : "km/h"}{" "}
											</p>
										</div>
									</div>
								</div>
							</div>
						);
					})
				)}
			</div>
		</>
	);
};

export default Hourly;
