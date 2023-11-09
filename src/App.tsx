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
        prerequisites: course.prereqs as unknown as string[],
        restrictions: course.restrictions as unknown as string,
        description: course.description,
        corequisites: course.coreqs as unknown as string[]
    })
);

const TEST_YEARS: Year[] = [
    { name: "Year 1", semesters: [], id: 5 },
    { name: "Year 2", semesters: [], id: 2 }
];

const DEFAULT_DEGREES: Degree[] = [
    { id: 577, name: "Sample Test", years: TEST_YEARS }
];

function App(): JSX.Element {
    // VARs holding list information on the user's degree plan
    const [courses, setCourses] = useState<Course[]>(COURSES);
    const [semesterList, setSemesterList] = useState<Semester[]>([]);
    const [degrees, setDegrees] = useState<Degree[]>(DEFAULT_DEGREES);

    // VARs used to control display of elements
    const [display, setDisplay] = useState<boolean>(true);
    const [isEditing, setEditing] = useState<boolean>(false);
    const [isDegree, setDegree] = useState<boolean>(false);
    const [showComponentSemester, setShowComponentSemester] = useState(false);

    // IDs used to differentiate instances of objects
    const [degreeId, setDegreeId] = useState<number>(1);
    const [yearId, setYearId] = useState<number>(1);
    const [currIndex, setIndex] = useState<number>(0);

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

    function addDegree(name: string) {
        const newDegree: Degree = {
            name: name,
            years: [],
            id: degreeId
        };
        const newId = degreeId + 1;
        setDegreeId(newId);
        setDegrees([...degrees, newDegree]);
    }

    function addYear(name: string, degree: Degree) {
        const newYear: Year = {
            name: name,
            semesters: [],
            id: yearId
        };

        const newId = yearId + 1;
        setYearId(newId);

        const updatedDegree: Degree = {
            ...degree,
            years: [...degree.years, newYear]
        };

        setDegrees(
            degrees.map(
                (d: Degree): Degree =>
                    d.id === updatedDegree.id ? updatedDegree : d
            )
        );
    }

    function removeDegree(id: number) {
        const newDegrees: Degree[] = degrees.filter(
            (degree: Degree): boolean => degree.id !== id
        );
        setDegrees(newDegrees);
    }

    function switchEditing(edit: boolean) {
        setEditing(edit);
    }

    const NUM_COURSES_DISPLAYED = 3;

    const handleClickSemester = () => {
        setShowComponentSemester(!showComponentSemester);
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
                                <Button
                                    onClick={() => {
                                        setDegree(false);
                                        setShowComponentSemester(false);
                                        setDisplay(!display);
                                        setEditing(!isEditing);
                                    }}
                                >
                                    Courses
                                </Button>
                            </li>
                            <li>
                                <Button
                                    onClick={() => {
                                        handleClickSemester();
                                        switchEditing(true);
                                        // Disables display for Degrees and Courses
                                        setDegree(false);
                                        setDisplay(false);
                                    }}
                                >
                                    Semesters
                                </Button>
                            </li>
                            <li>
                                <Button
                                    onClick={() => {
                                        switchEditing(true);
                                        setDegree(!isDegree);
                                        setDisplay(false);
                                        setShowComponentSemester(false);
                                    }}
                                >
                                    Degrees
                                </Button>
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
                        hidden={isEditing || currIndex <= 0}
                    >
                        Back
                    </Button>
                    <Button
                        onClick={() => setDisplay(!display)}
                        hidden={isEditing}
                    >
                        {display ? "Hide Courses" : "Show Courses"}
                    </Button>
                    <Button
                        onClick={() =>
                            currIndex < courses.length - NUM_COURSES_DISPLAYED
                                ? setIndex(currIndex + NUM_COURSES_DISPLAYED)
                                : setIndex(currIndex)
                        }
                        hidden={
                            isEditing ||
                            currIndex >= courses.length - NUM_COURSES_DISPLAYED
                        }
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

                <div className="SemesterList">
                    {showComponentSemester && (
                        <SemesterList
                            courses={courses}
                            semesterList={semesterList}
                            setSemesterList={setSemesterList}
                        ></SemesterList>
                    )}
                </div>

                <div className="DegreeList">
                    {isDegree && (
                        <DegreeList
                            degrees={degrees}
                            addDegree={addDegree}
                            removeDegree={removeDegree}
                            addYear={addYear}
                        ></DegreeList>
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
