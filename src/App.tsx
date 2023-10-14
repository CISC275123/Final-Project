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
            <Button onClick={() => setDisplay(!display)}>Show Courses</Button>
            <Button onClick={() => setCourses(COURSES)}>Edit</Button>
            {display && <CourseList courses={courses}></CourseList>}
        </div>
    );
}

export default App;
