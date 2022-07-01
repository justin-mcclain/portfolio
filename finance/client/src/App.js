import "./App.css";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
    return (
        <BrowserRouter>
            <div className="fullpage">
                <Switch>
                    <Route exact path="/">
                        <Login/>
                    </Route>
                    <Route exact path="/dashboard">
                        <Dashboard/>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
