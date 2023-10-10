import React from "react";
import "./App.css";

import logo from "./images/logo.png";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                <p>CISC275 - Introduction to Software Engineering</p>
                <br />
                <img src={logo} alt="Homepage logo" />
                <br />
                <p>
                    Created and Maintained by: Leon Giang, Jason Chan, Sibyl
                    Roosen, Abdullah Maruf, Taylor Kadans
                </p>
            </header>
        </div>
    );
}

export default App;
