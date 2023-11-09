import "./App.css";
import React, { useState } from "react";
import { Course } from "./interfaces/course";
import { Year } from "./interfaces/year";
import { Degree } from "./interfaces/degree";
import { DegreeList } from "./components/DegreeList";

import logo from "./images/logo.png";

import sample from "./data/courses.json";
import { Button } from "react-bootstrap";

import { Semester } from "./interfaces/semester";
import { CourseList } from "./components/CourseList";

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
    const [courses, setCourses] = useState<Course[]>(COURSES);
    const [degrees, setDegrees] = useState<Degree[]>([]);

    // VARs used to control display of elements
    const [display, setDisplay] = useState<boolean>(true);
    const [isEditing, setEditing] = useState<boolean>(false);
    const [isDegree, setDegree] = useState<boolean>(false);

    // IDs used to differentiate instances of objects
    const [degreeId, setDegreeId] = useState<number>(1);
    const [yearId, setYearId] = useState<number>(1);
    const [currIndex, setIndex] = useState<number>(0);

    // Used to edit a course. Replaces the target course with a modified course.
    // Works by passing in a target course ID and a new instance of the course.
    // It then maps, searching for the target ID and replaces if it matches!
    //
    // INPUTS:
    // courseID: string => The string course code with NO SPACES such as 'CISC101'
    // newCourse: Course => The new course instance containing the changes.
    //
    // OUTPUTS:
    // Modifies the state variable containing the list of courses.
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

    // Used to add a new degree plan. Takes user input for the name of the degree plan.
    //
    // INPUTS:
    // name: string => user input, a unique name given by the user so that they can easily remember it.
    //
    // OUTPUTS:
    // Modifies the state variable containing the list of Degrees. Adds the new degree to it.
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

    // Used to add a new instance of a Year to a degree. Takes user Input for the name.
    // Typically we want the name to be "Year [1-4]" or "Freshman", "Sophomore", etc ...
    //
    // TO DO : Remove the user input and make it a drop down to select one of the 4 names: ["Freshman", "Sophomore", "Junior", "Senior"]
    //
    // INPUTS:
    // name: string => user input, a unique name given by the user so that they can easily remember it.
    // degree: Degree => The target degree in which the year should be added.
    //
    // OUTPUTS:
    // Modifies the state variable containing the list of Degrees. Finds the matching degree and replaces it with the new, modified one
    // containing the added Year.
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

    // Used to add/remove semesters from a Year under Degrees.
    //
    // INPUTS:
    // newSemesterList: Semester[] => the new list of semesters containing the desired updates.
    // targetDegree: Degree => The target degree in which to update the Years.
    // targetYear: Year => the target Year in which to update the semesters.
    //
    // OUTPUTS:
    // Finds the correct Year and Degree before modifying the Degree list. Finds the correct degree ID and replaces
    // the old version with the new, updated Degree.
    function updateSemesterList(
        newSemesterList: Semester[],
        targetDegree: Degree,
        targetYear: Year
    ) {
        const newYear: Year = {
            ...targetYear,
            semesters: newSemesterList
        };

        const newYearList: Year[] = targetDegree.years.map(
            (y: Year): Year => (y.id === targetYear.id ? newYear : y)
        );

        const newDegree: Degree = {
            ...targetDegree,
            years: newYearList
        };

        setDegrees(
            degrees.map(
                (d: Degree): Degree =>
                    d.id === targetDegree.id ? newDegree : d
            )
        );
    }

    // Used to remove degree plans.
    //
    // INPUTS:
    // id: number => the id of the degree to remove.
    //
    // OUTPUTS:
    // Removes the correct ID from the list of degrees and updates the state variable containing the list of degrees.
    function removeDegree(id: number) {
        const newDegrees: Degree[] = degrees.filter(
            (degree: Degree): boolean => degree.id !== id
        );
        setDegrees(newDegrees);
    }

    function switchEditing(edit: boolean) {
        setEditing(edit);
    }

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
                                        switchEditing(true);
                                        setDegree(!isDegree);
                                        setDisplay(false);
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

                <div className="DegreeList">
                    {isDegree && (
                        <DegreeList
                            degrees={degrees}
                            addDegree={addDegree}
                            removeDegree={removeDegree}
                            addYear={addYear}
                            updateSemesterList={updateSemesterList}
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
