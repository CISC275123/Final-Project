import "./App.css";
import React, { useState } from "react";
import { Course } from "./interfaces/course";
import { CourseList } from "./components/CourseList";

import logo from "./images/logo.png";

import sample from "./data/courses.json";
import { Button } from "react-bootstrap";

const COURSES = sample.map(
    (course): Course => ({
        id: course.id,
        name: course.name,
        credits: course.credits as unknown as number,
        prerequisites: course.prereqs as unknown as string,
        restrictions: course.restrictions as unknown as string,
        description: course.description,
        corequisites: course.coreqs as unknown as string
    })
);

function App(): JSX.Element {
    const [courses, setCourses] = useState<Course[]>(COURSES);
    const [display, setDisplay] = useState<boolean>(false);
    const [currIndex, setIndex] = useState<number>(0);

    const NUM_COURSES_DISPLAYED = 3;

    return (
        <div className="App">
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
                    <Button
                        onClick={() =>
                            currIndex > 0
                                ? setIndex(currIndex - NUM_COURSES_DISPLAYED)
                                : setIndex(currIndex)
                        }
                    >
                        Back
                    </Button>
                    <Button onClick={() => setDisplay(!display)}>
                        Show Courses
                    </Button>
                    <Button
                        onClick={() =>
                            currIndex < courses.length - NUM_COURSES_DISPLAYED
                                ? setIndex(currIndex + NUM_COURSES_DISPLAYED)
                                : setIndex(currIndex)
                        }
                    >
                        Next
                    </Button>
                </div>

                <div className="CourseList">
                    {display && (
                        <CourseList
                            courses={courses.slice(
                                currIndex,
                                currIndex + NUM_COURSES_DISPLAYED
                            )}
                        ></CourseList>
                    )}
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
