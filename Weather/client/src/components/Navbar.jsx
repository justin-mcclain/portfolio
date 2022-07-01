import React, { useContext, useEffect } from "react";
import logo from "../assets/logo.png";
import Switch from "react-switch";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate, Link } from "react-router-dom";
import closeX from "../assets/close.svg";

const Navbar = () => {
	const {
		setChecked,
		setZip,
		zip,
		checked,
		formErrors,
		setFormErrors,
	} = useContext(AppContext);
	const navigate = useNavigate();
	const handleChange = (nextChecked) => {
		setChecked(nextChecked);
		const units = JSON.parse(localStorage.getItem("units"));
		units.useFahrenheit = !units.useFahrenheit;
		localStorage.setItem("units", JSON.stringify(units));
	};
    const closeError = () => {
        setFormErrors(false)
    }
	const hasLetters = /[a-z]/i;
	const zipHandler = async (e, zip) => {
		e.target[0].blur()
		e.preventDefault();
		const findDupe = (arr) => {
			for (var i = 0; i < arr.length; i++) {
				if (
					arr[i].lat === zipResponse.data.lat &&
					arr[i].lon === zipResponse.data.lon
				) {
					return true;
				} else {
					return false;
				}
			}
		};
		const zipResponse = await axios
			.get(
				`http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
			)
			.catch(() => {
                setFormErrors(true);
                setZip("")
			});
		if (localStorage.getItem("rc") === null) {
			localStorage.setItem(
				"rc",
				JSON.stringify([
					{
						lat: zipResponse.data.lat,
						lon: zipResponse.data.lon,
						zip: zip,
					},
				])
			);
		} else if (
			JSON.parse(localStorage.getItem("rc")).length > 6 &&
			findDupe(JSON.parse(localStorage.getItem("rc"))) === true
		) {
			const tooLong = JSON.parse(localStorage.getItem("rc"));
			for (var i = 0; i < tooLong.length; i++) {
				if (
					tooLong[i].lat === zipResponse.data.lat &&
					tooLong[i].lon === zipResponse.data.lon
				) {
					tooLong.splice(i, 1);
					i--;
				}
			}
			tooLong.unshift({
				lat: zipResponse.data.lat,
				lon: zipResponse.data.lon,
				zip: zip,
			});
			localStorage.setItem("rc", JSON.stringify(tooLong));
		} else if (
			JSON.parse(localStorage.getItem("rc")).length > 6 &&
			findDupe(JSON.parse(localStorage.getItem("rc"))) === false
		) {
			const prevRecent = JSON.parse(localStorage.getItem("rc"));
			prevRecent.pop();
			prevRecent.unshift({
				lat: zipResponse.data.lat,
				lon: zipResponse.data.lon,
				zip: zip,
			});
			localStorage.setItem("rc", JSON.stringify(prevRecent));
		} else {
			const prevRecent = JSON.parse(localStorage.getItem("rc"));
			prevRecent.unshift({
				lat: zipResponse.data.lat,
				lon: zipResponse.data.lon,
				zip: zip,
			});
			localStorage.setItem("rc", JSON.stringify(prevRecent));
		}
		navigate(`/weather/current/${zipResponse.data.name}/${zipResponse.data.lat}/${zipResponse.data.lon}`);
		setZip("");
        setFormErrors(false);
	};
	useEffect(() => {
		if (localStorage.getItem("units") === null) {
			const units = { useFahrenheit: true };
			localStorage.setItem("units", JSON.stringify(units));
		} else if (
			JSON.parse(localStorage.getItem("units")).useFahrenheit === false
		) {
			setChecked(!checked);
		}
	}, []);
	return (
		<>
			<nav>
				<div className="navbarcontent">
					<div className="nav_left">
						<Link to="/">
							<img src={logo} alt="Weather Logo" />
						</Link>
						<form onSubmit={(e) => zipHandler(e, zip)}>
							<input
								type="number"
								placeholder="Enter Zip Code"
								onChange={(e) => setZip(e.target.value)}
								value={zip}
							/>
						</form>
						<Switch
							onChange={handleChange}
							checked={checked}
							onColor="#f2663c"
							offColor="#0d8af5"
							onHandleColor="#fff"
							handleDiameter={30}
							width={60}
							checkedIcon={
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										paddingLeft: 5,
										paddingTop: 2,
										fontWeight: "bold",
										color: "white",
									}}>
									°F
								</div>
							}
							uncheckedIcon={
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										paddingRight: 5,
										paddingTop: 2,
										fontWeight: "bold",
										color: "white",
									}}>
									°C
								</div>
							}
						/>
					</div>
					<div className="nav_right">
						<ul>
							<li>
								<a href="/">Home</a>
							</li>
							<li>
								<a
									href="https://github.com/justin-mcclain"
									target="_blank"
									rel="noreferrer">
									GitHub
								</a>
							</li>
							<li>
								<a href="/sources">External Sources</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			{formErrors ? (
				<div className="error">
					<div className="errorcontent">
                        <div className="errormessage">
                                <img src={closeX} alt="" onClick={() => closeError()}/>
                            <p>Please enter a valid zip code</p>
                        </div>
                    </div>
				</div>
			) : null}
		</>
	);
};

export default Navbar;
