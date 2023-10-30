import "./App.css";
import React, { useState } from "react";
import { Course } from "./interfaces/course";
import { Year } from "./interfaces/year";
import { Degree } from "./interfaces/degree";
import { CourseList } from "./components/CourseList";
import { DegreeList } from "./components/DegreeList";

import logo from "./images/logo.png";

import sample from "./data/courses.json";
import { Button } from "react-bootstrap";

import { Semester } from "./interfaces/semester";
import { SemesterList } from "./components/Semester/SemesterList";

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

// Testing Degrees with test data
const SEMESTERS: Semester[] = [
    {
        title: "Fall",
        courseList: COURSES,
        id: 0,
        notes: "",
        maxCredits: 18,
        currentCredits: 0
    },
    {
        title: "Spring",
        courseList: COURSES,
        id: 1,
        notes: "",
        maxCredits: 18,
        currentCredits: 0
    },
    {
        title: "Winter",
        courseList: COURSES,
        id: 2,
        notes: "",
        maxCredits: 6,
        currentCredits: 0
    },
    {
        title: "Summer",
        courseList: COURSES,
        id: 3,
        notes: "",
        maxCredits: 6,
        currentCredits: 0
    }
];

const YEARS: Year[] = [
    { name: "Year 1", semesters: SEMESTERS },
    { name: "Year 2", semesters: SEMESTERS },
    { name: "Year 3", semesters: SEMESTERS },
    { name: "Year 4", semesters: SEMESTERS }
];
const DEGREES: Degree[] = [
    { name: "Degree 1", years: YEARS },
    { name: "Degree 2", years: YEARS }
];

function App(): JSX.Element {
    const [courses, setCourses] = useState<Course[]>(COURSES);
    const [display, setDisplay] = useState<boolean>(true);
    const [currIndex, setIndex] = useState<number>(0);
    const [isEditing, setEditing] = useState<boolean>(false);
    const [isDegree, setDegree] = useState<boolean>(false);
    const [showComponentSemester, setShowComponentSemester] = useState(false);

    function editCourse(courseID: string, newCourse: Course) {
        setCourses(
            courses.map(
                (course: Course): Course =>
                    course.id.replace(/\s/g, "") === courseID
                        ? newCourse
                        : course
            )
        );
    }

    function switchEditing(edit: boolean) {
        setEditing(edit);
    }

    const NUM_COURSES_DISPLAYED = 3;

    const handleClickSemester = () => {
        setShowComponentSemester(!showComponentSemester);
        setDisplay(!display);
    };

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
                                <Button onClick={handleClickSemester}>
                                    Semesters
                                </Button>
                                <a href="#Semesters">Semesters</a>
                            </li>
                            <li>
                                <Button
                                    onClick={() => {
                                        switchEditing(!isEditing);
                                        setDisplay(!display);
                                        setDegree(!isDegree);
                                    }}
                                >
                                    Degrees
                                </Button>
                            </li>
                        </ul>
                    </nav>
                </header>
                <div>
                    {" "}
                    {showComponentSemester && <SemesterList></SemesterList>}
                </div>
                <div className="CourseButtons">
                    <Button
                        onClick={() =>
                            currIndex > 0
                                ? setIndex(currIndex - NUM_COURSES_DISPLAYED)
                                : setIndex(currIndex)
                        }
                        hidden={isEditing}
                    >
                        Back
                    </Button>
                    <Button
                        onClick={() => setDisplay(!display)}
                        hidden={isEditing}
                    >
                        Show Courses
                    </Button>
                    <Button
                        onClick={() =>
                            currIndex < courses.length - NUM_COURSES_DISPLAYED
                                ? setIndex(currIndex + NUM_COURSES_DISPLAYED)
                                : setIndex(currIndex)
                        }
                        hidden={isEditing}
                    >
                        Next
                    </Button>
                </div>
                {/* The beginning of the list of courses in the html  */}
                <div className="CourseList">
                    {display && (
                        <CourseList
                            courses={courses.slice(
                                currIndex,
                                currIndex + NUM_COURSES_DISPLAYED
                            )}
                            editCourse={editCourse}
                            switchEditing={switchEditing}
                            default_courses={COURSES}
                        ></CourseList>
                    )}
                </div>

                <div className="DegreeList">
                    {isDegree && <DegreeList degrees={DEGREES}></DegreeList>}
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
