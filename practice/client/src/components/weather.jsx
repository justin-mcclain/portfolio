import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
    let [chiTemp, setChiTemp] = useState([]);
    let [loaded, setLoaded] = useState(false);
    const fetchData = async () => {
        const response = await axios.get(
            "https://api.openweathermap.org/data/3.0/onecall?lat=41.87&lon=-87.62&units=imperial&appid=9ce1a7cb8abfdaed2fdb4b805a138c09"
        );
        setChiTemp(response.data.daily);
        setLoaded(true);
    };
    useEffect(() => {
        fetchData();
    }, []);
    console.log("TEMP", chiTemp);
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="weatherBox d-flex border border-secondary">
                    {loaded ? (
                        chiTemp.slice(0,5).map((tempObj, idx) => {
                            return (
                                <div key={idx} style={{backgroundColor: (idx === 0) ? "lightgray" : "white" }}className="">
                                    <p>{new Date(tempObj.dt * 1000).toLocaleDateString("en", { weekday: "short", })}</p>
                                    <img
                                        src={`http://openweathermap.org/img/wn/${tempObj.weather[0].icon}@2x.png`}
                                        alt=""
                                    />
                                    <p>
                                        <b>{Math.ceil(tempObj.temp.max)}<span>&#176;</span></b> <b><span style={{color: "gray"}}>{Math.ceil(tempObj.temp.min)}&#176;</span></b>
                                    </p>
                                </div>
                            );
                        })
                    ) : (
                        null
                    )}
                </div>
            </div>
        </>
    );
};

export default Weather;
