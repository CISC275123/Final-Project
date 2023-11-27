/* eslint-disable no-extra-parens */
import "./App.css";
import React, { useEffect, useState } from "react";
import { Course } from "./interfaces/course";
import { Degree } from "./interfaces/degree";

import logo from "./images/logo.png";
import { Button } from "react-bootstrap";
import catalog from "./data/catalog.json";

import { HomePage } from "./components/HomePage";

// Creates default list of courses pulling from a JSON file.
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

// sets the number of courses to be displayed on a single page.
const NUM_COURSES_DISPLAYED = 3;

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
            <div className="HomePage">{isHome && <HomePage></HomePage>}</div>

            {/* Following are a part of the "COURSES" functionality  */}
            <div hidden={!courseDisplay || isEditing} className="CourseButtons">
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
                    onClick={() =>
                        currIndex <
                        globalCourseList.length - NUM_COURSES_DISPLAYED
                            ? setIndex(currIndex + NUM_COURSES_DISPLAYED)
                            : setIndex(currIndex)
                    }
                    hidden={
                        isEditing ||
                        currIndex >=
                            globalCourseList.length - NUM_COURSES_DISPLAYED
                    }
                >
                    Next
                </Button>
            </div>
            <div hidden={!courseDisplay} className="CourseList">
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

            <footer>
                <p>
                    Created and Maintained by: Leon Giang, Jason Chan, Sibyl
                    Roosen, Abdullah Maruf, Taylor Kadans
                </p>
            </footer>
        </body>
    );
}

export default App;
