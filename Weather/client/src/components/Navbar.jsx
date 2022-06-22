import React, { useContext, useEffect } from "react";
import logo from "../assets/logo.png";
import Switch from "react-switch";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
	const { setWeath, setChecked, setZip, zip, checked, setCity } =
		useContext(AppContext);
    const navigate = useNavigate();
	const handleChange = (nextChecked) => {
		setChecked(nextChecked);
        if (localStorage.getItem("units") === true) {
            localStorage.setItem("units", false)
        } else {
            localStorage.setItem("units", true)
        }
	};
	const zipHandler = async (e, zip) => {
		e.preventDefault();
		const zipResponse = await axios.get(
			`http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
		);
		const response = checked
			? await axios.get(
					`https://api.openweathermap.org/data/2.5/onecall?lat=${zipResponse.data.lat}&lon=${zipResponse.data.lon}&exclude=minutely,alerts&units=imperial&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
			  )
			: await axios.get(
					`https://api.openweathermap.org/data/2.5/onecall?lat=${zipResponse.data.lat}&lon=${zipResponse.data.lon}&exclude=minutely,alerts&units=metric&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
			  );
		setCity(zipResponse.data);
		setWeath(response.data);
		if (localStorage.getItem("rc") === null) {
			localStorage.setItem(
				"rc",
				JSON.stringify([
					{ lat: zipResponse.data.lat, lon: zipResponse.data.lon },
				])
			);
		} else {
			const prevRecent = JSON.parse(localStorage.getItem("rc"));
			for (var i = 0; i < prevRecent.length; i++) {
				if (
					prevRecent[i].lat === zipResponse.data.lat &&
					prevRecent[i].lon === zipResponse.data.lon
				) {
					prevRecent.splice(i, 1);
                    i--
				}
			}
            prevRecent.unshift({
                lat: zipResponse.data.lat,
                lon: zipResponse.data.lon,
            });
			localStorage.setItem("rc", JSON.stringify(prevRecent));
		}
		setZip("");
        navigate(`/weather/${zipResponse.data.name}/`)
	};
    useEffect(()=>{ 
        if (localStorage.getItem("units") === null) {
            localStorage.setItem("units", true)
        }
    }, [])
	return (
		<>
			<nav>
				<div className="nav_left">
					<Link to="/"><img src={logo} alt="Weather Logo" /></Link>
					<form onSubmit={(e) => zipHandler(e, zip)}>
						<input
							type="text"
							placeholder="Enter Zip Code"
							onChange={(e) => setZip(e.target.value)}
							value={zip}
						/>
					</form>
					<Switch
						onChange={handleChange}
						checked={checked}
						onColor="#f19122"
						onHandleColor="#f1602b"
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
							<a href="/">Home</a>
						</li>
						<li>
							<a href="/">Home</a>
						</li>
						<li>
							<a href="/">Home</a>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
