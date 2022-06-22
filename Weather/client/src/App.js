import "./App.scss";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Recent from "./components/Recent";
import Error from "./components/Error";
import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Weather from "./components/Weather";

export const AppContext = createContext();

function App() {
    const [loaded, setLoaded] = useState(false);
    const [checked, setChecked] = useState(true);
    const [zip, setZip] = useState("");
    const [city, setCity] = useState([]);
    const [weath, setWeath] = useState([]);
    const [recent, setRecent] = useState([]);
    const [test, setTest] = useState([]);
    const [test2, setTest2] = useState([]);
    return (
        <Router>
            <AppContext.Provider
                value={{
                    loaded,
                    setLoaded,
                    checked,
                    setChecked,
                    zip,
                    setZip,
                    weath,
                    setWeath,
                    city,
                    setCity,
                    recent,
                    setRecent,
                    test,
                    setTest,
                    test2,
                    setTest2
                }}
            >
                <Navbar />
                <div className="container">
                    <Recent />
                    <Routes>
                        <Route path="/" element={<Landing/>}/>
                        <Route path="/weather/:acity" element={<Weather/>}/>
						<Route path="*" element={<Error/>}/>
                    </Routes>
                </div>
            </AppContext.Provider>
        </Router>
    );
}

export default App;
