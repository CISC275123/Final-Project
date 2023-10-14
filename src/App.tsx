import React from "react";
import "./App.css";

import logo from "./images/logo.png";
import { Button } from "react-bootstrap";

function App(): JSX.Element {
    return (
        <div className="App">
            <head>
                <title>Degree Audit</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                ></meta>
            </head>

            <body>
                <header className="App-header">
                    <nav>
                        <a className="logo" href="index.html">
                            <img src={logo} alt="Homepage logo"></img>
                        </a>
                        <p className="title">
                            CISC275 - Introduction to Software Engineering
                        </p>
                        <ul className="nav_links">
                            <li>
                                <a href="#Home">Home</a>
                            </li>
                            <li>
                                <a href="#Courses">Courses</a>
                            </li>
                            <li>
                                <a href="#Semesters">Semesters</a>
                            </li>
                            <li>
                                <a href="#Degrees">Degress</a>
                            </li>
                        </ul>
                    </nav>
                </header>

                <div className="CourseButtons">
                    <Button>Back</Button>
                    <Button>Next</Button>
                </div>

                <footer>
                    <p>
                        Created and Maintained by: Leon Giang, Jason Chan, Sibyl
                        Roosen, Abdullah Maruf, Taylor Kadans
                    </p>
                </footer>
            </body>
        </div>
    );
}

export default App;
