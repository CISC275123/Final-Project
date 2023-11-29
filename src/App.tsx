/* eslint-disable no-extra-parens */
import "./App.css";
import React, { useEffect, useState } from "react";
import { Course } from "./interfaces/course";
import { Degree } from "./interfaces/degree";

import logo from "./images/logo.png";
import { Button } from "react-bootstrap";
import catalog from "./data/catalog.json";

import { HomePage } from "./components/HomePage";
import { CourseDisplay } from "./components/CourseDisplay";
import { DegreeDisplay } from "./components/DegreeDisplay";

function App(): JSX.Element {
    // VARs holding list information on the user's degree plan
    const [startingDegreeId, setStartingDegreeId] = useState<number>(1);
    const [globalCourseList, setGlobalCourseList] = useState<Course[]>([]);
    const [isDataSaved, setIsDataSaved] = useState<boolean>(false);
    const [globalDegreeList, setGlobalDegreeList] = useState<Degree[]>(() => {
        const rawSavedDegrees = localStorage.getItem("degrees");
        if (rawSavedDegrees) {
            setIsDataSaved(true);
            const savedDegrees = JSON.parse(rawSavedDegrees);
            if (savedDegrees.length > 0) {
                setStartingDegreeId(
                    savedDegrees[
                        savedDegrees.length > 0 ? savedDegrees.length - 1 : 0
                    ].id + 1
                );
                return savedDegrees;
            }
            setIsDataSaved(false);
            return [];
        } else {
            setIsDataSaved(false);
            return [];
        }
    });
    const [departments, setDepartments] = useState<string[]>(["All"]);

    // VARs used to control display of elements
    const [courseDisplay, setCourseDisplay] = useState<boolean>(false);
    const [isDegree, setDegree] = useState<boolean>(false);
    const [isHome, setIsHome] = useState<boolean>(true);

    function updateGlobalCourseList(newList: Course[]) {
        setGlobalCourseList(newList);
    }

    function updateGlobalDegreeList(newList: Degree[]) {
        setGlobalDegreeList(newList);
    }

    useEffect(() => {
        interface JSONCourse {
            code: string;
            name: string;
            descr: string;
            credits: string;
            preReq: string;
            restrict: string;
            breadth: string;
            typ: string;
        }

        // Creates default list of courses pulling from a JSON file.
        let counter = 1;
        const updatedCourseData: {
            [dept: string]: { [courseCode: string]: Course };
        } = {};

        const updateData: {
            [department: string]: { [courseCode: string]: JSONCourse };
        } = catalog;

        const depts = Object.keys(updateData);

        for (const dept in updateData) {
            updatedCourseData[dept] = {};
            const courses = updateData[dept];
            for (const courseCode in courses) {
                const course = courses[courseCode];
                const courseWithId: Course = {
                    ...course,
                    id: counter
                };
                updatedCourseData[dept][courseCode] = courseWithId;
                counter++;
            }
        }

        // Store the course list with IDs in the component's state
        const COURSES: Course[] = Object.values(updatedCourseData)
            .map(Object.values)
            .flat();

        setGlobalCourseList(COURSES);
        setDepartments([...departments, ...depts]);
    }, []);

    useEffect(() => {
        // Save degree plans to local storage
        localStorage.setItem("degrees", JSON.stringify(globalDegreeList));
    }, [globalDegreeList]);

    return (
        <body className="App">
            {/* Header containing navbar and site header information  */}
            <header className="App-header">
                <nav>
                    <a
                        className="logo"
                        onClick={() => {
                            setDegree(false);
                            setCourseDisplay(false);
                            setIsHome(true);
                        }}
                    >
                        <img src={logo} alt="Homepage logo"></img>
                    </a>
                    <p className="title">
                        CISC275 - Introduction to Software Engineering
                    </p>
                    <ul className="nav_links">
                        <li>
                            <Button
                                className="Home"
                                onClick={() => {
                                    setDegree(false);
                                    setCourseDisplay(false);
                                    setIsHome(true);
                                }}
                            >
                                Home
                            </Button>
                        </li>
                        <li>
                            <Button
                                className="Courseshome"
                                onClick={() => {
                                    setDegree(false);
                                    setCourseDisplay(!courseDisplay);
                                    setIsHome(false);
                                }}
                            >
                                Courses
                            </Button>
                        </li>
                        <li>
                            <Button
                                className="Degreesbutton"
                                onClick={() => {
                                    setDegree(!isDegree);
                                    setCourseDisplay(false);
                                    setIsHome(false);
                                }}
                            >
                                Degrees
                            </Button>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* The default home page  */}
            <div className="HomePage">
                {isHome && <HomePage></HomePage>}
                <div className="bubbles"></div>
            </div>

            {/* Course List Functionality */}
            <div className="CourseList">
                {courseDisplay && (
                    <CourseDisplay
                        updateGlobalCourseList={updateGlobalCourseList}
                        globalCourseList={globalCourseList}
                        departments={departments}
                    ></CourseDisplay>
                )}
            </div>

            {/* Degree Plan Functionality */}
            <div className="DegreeList">
                {isDegree && (
                    <DegreeDisplay
                        isDataSaved={isDataSaved}
                        updateGlobalDegreeList={updateGlobalDegreeList}
                        globalDegreeList={globalDegreeList}
                        startingDegreeId={startingDegreeId}
                    ></DegreeDisplay>
                )}
            </div>

            <footer className="footerCustom">
                <p>
                    Created and Maintained by: Leon Giang, Jason Chan, Sibyl
                    Roosen, Abdullah Maruf, Taylor Kadans
                </p>
            </footer>
        </body>
    );
}

export default App;
