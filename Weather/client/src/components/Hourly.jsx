import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";

const Hourly = () => {
	const {
		checked,
		hourData,
		moreLoad
	} = useContext(AppContext);
	const dayjs = require("dayjs");
	var advancedFormat = require("dayjs/plugin/advancedFormat");
	dayjs.extend(advancedFormat);
	return (
		<>
			<div className="hourly">
				<div className="header">
						<h2>
							Hourly Forecast
						</h2>
				</div>
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
												{dayjs(hour.dt * 1000).format(
													"h:mm A"
												)}
											</td>
											<td className="desc">
												<img
													src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
													alt=""
												/>
												{hour.weather[0].description}
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
												<td>{hour.rain["1h"]} in</td>
											) : (
												<td>0 in</td>
											)}
											<td>{hour.clouds}%</td>
											<td>{hour.dew_point.toFixed()}{checked ? "°F" : "°C"}</td>
											<td>{hour.humidity}%</td>
											<td>
												{hour.wind_speed.toFixed()} {checked? "mph" : "km/h"}{" "}
											</td>
										</tr>
									);
							  })
							: null}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Hourly;
