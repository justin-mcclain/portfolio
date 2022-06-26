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
			JSON.parse(localStorage.getItem("rc")).map((city, index) => {
				axios
					.get(
						`http://api.openweathermap.org/geo/1.0/reverse?lat=${city.lat}&lon=${city.lon}&limit=5&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
					)
					.then((res) => {
						setTest((test) => [...test, { ...res.data[0], index }]);
					});
			});
		}
		setLoaded(true);
	}, [weath]);
	return (
		<>
			<div className="recents">
				<div className="recentcities">
                    <p>Recent Cities: </p>
                    <ul>
                        {loaded
                            ? test
                                    .sort((a, b) => a.index - b.index)
                                    .map((rc, index) => {
                                        return (
                                            <Link to={`/weather/${rc.name}`} key={index}>
                                                <li key={index}>
                                                    {rc.name}, {rc.state}
                                                </li>
                                            </Link>
                                        );
                                    })
                            : null}
                    </ul>
                </div>
			</div>
		</>
	);
};

export default Recent;
