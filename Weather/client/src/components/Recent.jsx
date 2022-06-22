import axios from "axios";
import React from "react";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const Recent = () => {
	const { weath, test, setTest, loaded, setLoaded } = useContext(AppContext);
	useEffect(() => {
		setTest([]);
		if (JSON.parse(localStorage.getItem("rc")) !== null) {
			JSON.parse(localStorage.getItem("rc")).map((city) => {
				axios
					.get(
						`http://api.openweathermap.org/geo/1.0/reverse?lat=${city.lat}&lon=${city.lon}&limit=5&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
					)
					.then((res) => {
                        setTest((test) => [...test, res.data[0]])
					});
			});
		}
		setLoaded(true);
	}, [weath]);
	return (
		<>
			<div className="recents">
				<p>Recent Cities: </p>
				<ul>
					{loaded
						? test.map((rc, index) => {
								return (
									<li key={index}>
										<Link to={`/weather/${rc.name}`}>
											{rc.name},{rc.state}
										</Link>
									</li>
								);
						  })
						: null}
				</ul>
			</div>
		</>
	);
};

export default Recent;
