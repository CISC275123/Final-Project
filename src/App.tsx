/* eslint-disable no-extra-parens */
import "./App.css";
import React, { useState } from "react";
import { Course } from "./interfaces/course";
import { Year } from "./interfaces/year";
import { Degree } from "./interfaces/degree";
import { DegreeList } from "./components/DegreeList";

import logo from "./images/logo.png";

import sample from "./data/courses.json";
import catalog from "./data/catalog.json";
import { Button } from "react-bootstrap";

import { Semester } from "./interfaces/semester";
import { CourseList } from "./components/CourseList";
import { HomePage } from "./components/HomePage";
import { DepartmentCourses } from "./interfaces/departmentCourses";
import { CourseObject } from "./interfaces/courseObject";

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

interface CourseInfo {
    code: string;
    name: string;
    descr: string;
    credits: string;
    preReq: string;
    restrict: string;
    breadth: string;
    typ: string;
}
function getDepartmentCourses() {
    const updateData: { [key: string]: { [courseCode: string]: CourseInfo } } =
        catalog;

    for (const key in catalog) {
        const courses = catalog[key];
        console.log(`Key: ${key}`);
        for (const courseCode in courses) {
            const course = courses[courseCode];
            console.log(`Course Code: ${course.code}`);
            console.log(`Course Name: ${course.name}`);
            console.log(`Description: ${course.descr}`);
            console.log(`Credits: ${course.credits}`);
            console.log(`Prerequisites: ${course.preReq}`);
            console.log(`Restrictions: ${course.restrict}`);
            console.log(`Breadth: ${course.breadth}`);
            console.log(`Type: ${course.typ}`);
            console.log("--------------------------------------");
        }
    }
}

// sets the number of courses to be displayed on a single page.
const NUM_COURSES_DISPLAYED = 3;

function App(): JSX.Element {
    // VARs holding list information on the user's degree plan
    const [globalCourseList, setGlobalCourseList] = useState<Course[]>(COURSES);
    const [degreeList, setDegreeList] = useState<Degree[]>([]);

    // VARs used to control display of elements
    const [courseDisplay, setCourseDisplay] = useState<boolean>(false);
    const [isEditing, setEditing] = useState<boolean>(true);
    const [isDegree, setDegree] = useState<boolean>(false);
    const [isHome, setIsHome] = useState<boolean>(true);

    // IDs used to differentiate instances of objects
    const [degreeId, setDegreeId] = useState<number>(1);
    const [yearId, setYearId] = useState<number>(1);

    // Index used to scroll through the display of courses
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
        setGlobalCourseList(
            globalCourseList.map(
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
        getDepartmentCourses();
        const newDegree: Degree = {
            name: name,
            years: [],
            id: degreeId
        };
        const newId = degreeId + 1;
        setDegreeId(newId);
        setDegreeList([...degreeList, newDegree]);
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

        setDegreeList(
            degreeList.map(
                (d: Degree): Degree =>
                    d.id === updatedDegree.id ? updatedDegree : d
            )
        );
    }

    // Used to delete a year from a Degree plan
    //
    // INPUTS:
    // targetYear: Year => the target year to delete.
    // targetDegree: Degree => The target degree in which the year should be removed.
    //
    // OUTPUTS:
    // Creates a new list of yeuars containing everything except the target year using filter.
    // Creates a new degree instance with the new list of years.
    // Replaces the target degree in the current list of degrees with the updated one.
    function deleteYear(targetYear: Year, targetDegree: Degree) {
        const newYearList: Year[] = targetDegree.years.filter(
            (year: Year): boolean => year.id !== targetYear.id
        );

        const newDegree: Degree = { ...targetDegree, years: newYearList };

        setDegreeList(
            degreeList.map(
                (degree: Degree): Degree =>
                    degree.id === targetDegree.id ? newDegree : degree
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

        setDegreeList(
            degreeList.map(
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
        const newDegrees: Degree[] = degreeList.filter(
            (degree: Degree): boolean => degree.id !== id
        );
        setDegreeList(newDegrees);
    }

    // Used to display/hide the relevant buttons when editing a course. Takes in a boolean to set the value of isEditing to.
    function switchEditing(edit: boolean) {
        setEditing(edit);
    }

    return (
        <body className="App">
            {/* Header containing navbar and site header information  */}
            <header className="App-header">
                <nav>
                    <a
                        className="logo"
                        onClick={() => {
                            switchEditing(true);
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
                                    switchEditing(true);
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
                                    setEditing(false);
                                    setIsHome(false);
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
                    <CourseList
                        courses={globalCourseList.slice(
                            currIndex,
                            currIndex + NUM_COURSES_DISPLAYED
                        )}
                        editCourse={editCourse}
                        switchEditing={switchEditing}
                        default_courses={COURSES}
                    ></CourseList>
                )}
            </div>

            {/* Following sets up the Degree Plan functionality  */}
            <div hidden={!isDegree} className="DegreeList">
                {isDegree && (
                    <DegreeList
                        degrees={degreeList}
                        addDegree={addDegree}
                        removeDegree={removeDegree}
                        addYear={addYear}
                        deleteYear={deleteYear}
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
    );
}

export default App;
