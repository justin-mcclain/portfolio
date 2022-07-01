import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import rainDrop from "../assets/waterdrop.svg";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const Weather = () => {
	const {
		weath,
		checked,
		moreLoad,
		graphData,
		uv,
		airQual,
	} = useContext(AppContext);
	Chart.register(ChartDataLabels);
	Chart.register(...registerables);
	Chart.defaults.font.size = 12;
	const dayjs = require("dayjs");
	var advancedFormat = require("dayjs/plugin/advancedFormat");
	dayjs.extend(advancedFormat);
	function displayChart() {
		if (moreLoad) {
			const data = {
				labels: graphData
					.slice(0, 8)
					.map((graph) => dayjs(graph.dt * 1000).format("h A")),
				datasets: [
					{
						label: "Temp",
						data: graphData
							.slice(0, 8)
							.map((graph2) => graph2.temp.toFixed()),
						fill: true,
						borderColor: "#f1612b",
						backgroundColor: "#f1642b2e",
						borderWidth: 2,
						pointRadius: 0,
						tension: 0.25,
						datalabels: {
							labels: {
								value: {
									color: "black",
								},
							},
							align: "end",
							offset: -0.5,
						},
					},
				],
			};
			const options = {
				responsive: true,
				maintainAspectRatio: false,
				title: {
					display: true,
					text: "Line Chart",
					fontSize: 25,
				},
				scales: {
					x: {
						grid: {
							display: false,
							drawBorder: false,
						},
					},
					y: {
						grid: {
							display: false,
							drawBorder: false,
						},
						ticks: {
							stepSize: 1,
							display: false,
						},
						grace: 3,
					},
				},
				plugins: {
					legend: {
						display: false,
					},
				},
			};
			return <Line data={data} options={options} />;
		} else {
			return "Loading...";
		}
	}
	return (
		<>
			<div className="header">
				<h2>Current Weather</h2>
			</div>
			{moreLoad ? (
				<div className="weather">
					<div className="weatherleft">
						<div className="weatherleft_box">
							<div className="small-box-left">
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
											Feels like{" "}
											{weath.current.feels_like.toFixed()}°
											{checked ? "F" : "C"}
										</p>
									</div>
								</div>
							</div>
							<div className="small-box-right">
								<div className="small-box-right-left">
									<p>Precipitation</p>
									<p>Humidity</p>
									<p>Visibility</p>
									<p>Clouds</p>
									<p>Dew Point</p>
									<p>UV Index</p>
									<p>Air Quality</p>
								</div>
								<div className="small-box-right-right">
									<p>{weath.hourly[0].pop}%</p>
									<p>{weath.current.humidity}%</p>
									<p>{weath.current.visibility} m</p>
									<p>{weath.current.clouds}%</p>
									<p>
										{weath.current.dew_point.toFixed()}
										{checked ? "°F" : "°C"}
									</p>
									<p>{uv}</p>
									<p>{airQual}</p>
								</div>
							</div>
						</div>
						<div className="weatherleft_box">
							<div className="chartheader">Temperature</div>
							<div className="chart">{displayChart()}</div>
						</div>
					</div>
					<div className="weatherright">
						<div className="weatherright_box">
							<div className="weatherside-header">
								<h4>Today</h4>
								<p>
									{dayjs(weath.daily[0].dt * 1000).format(
										"M/D"
									)}
								</p>
							</div>
							<p>
								{weath.daily[0].temp.max.toFixed()}
								{checked ? "°F" : "°C"} | {weath.daily[0].temp.min.toFixed()}
								{checked ? "°F" : "°C"}
							</p>
							<p>
								{weath.daily[0].pop}%{" "}
								<img src={rainDrop} alt="" />{" "}
								{weath.daily[0].rain
									? `${weath.daily[0].rain} in`
									: null}
							</p>
							<p>{weath.daily[0].weather[0].description}</p>
						</div>
						<div className="weatherright_box">
							<div className="weatherside-header">
								<h4>Tomorrow</h4>
								<p>
									{dayjs(weath.daily[1].dt * 1000).format(
										"M/D"
									)}
								</p>
							</div>
							<p>
                            {weath.daily[1].temp.max.toFixed()}
								{checked ? "°F" : "°C"} | {weath.daily[1].temp.min.toFixed()}
								{checked ? "°F" : "°C"}
							</p>
							<p>
								{weath.daily[1].pop}%{" "}
								<img src={rainDrop} alt="" />{" "}
								{weath.daily[1].rain
									? `${weath.daily[1].rain} in`
									: null}
							</p>
							<p>{weath.daily[1].weather[0].description}</p>
						</div>
					</div>
				</div>
			) : <p>Loading...</p>}
		</>
	);
};

export default Weather;
