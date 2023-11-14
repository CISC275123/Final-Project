/* eslint-disable no-extra-parens */
import "./App.css";
import React, { useState, useEffect } from "react";
import { Course } from "./interfaces/course";
import { Year } from "./interfaces/year";
import { Degree } from "./interfaces/degree";
import { DegreeList } from "./components/DegreeList";

import logo from "./images/logo.png";
import catalog from "./data/catalog.json";
import { Button, Form } from "react-bootstrap";

import { Semester } from "./interfaces/semester";
import { CourseList } from "./components/CourseList";
import { HomePage } from "./components/HomePage";

// sets the number of courses to be displayed on a single page.
// TO DO : Let the user choose this number
const NUM_COURSES_DISPLAYED = 3;

function App(): JSX.Element {
    // VARs holding list information on the user's degree plan
    const [globalCourseList, setGlobalCourseList] = useState<Course[]>([]);
    const [degreeList, setDegreeList] = useState<Degree[]>([]);

    // VAR used to hold the default course list with NO edits.
    const [defaultCourses, setDefaultCourses] = useState<Course[]>([]);

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

    // VARs used to track course department filter
    const [departmentFilter, setDepartmentFilter] = useState<string>("All");
    const [departments, setDepartments] = useState<string[]>(["All"]);
    const [filteredList, setFilteredList] = useState<Course[]>([]);

    // VAR used to track what page in courses list the user is viewing
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Creates global list of ALL courses in the catalog json.
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
        setDefaultCourses(COURSES);
        setFilteredList(COURSES);
        setDepartments([...departments, ...depts]);
    }, []);

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
    function editCourse(courseID: number, newCourse: Course) {
        setGlobalCourseList(
            globalCourseList.map(
                (course: Course): Course =>
                    course.id === courseID ? newCourse : course
            )
        );

        // if the user is currently filter courses, update the filtered course.
        setFilteredList(
            globalCourseList
                .map(
                    (course: Course): Course =>
                        course.id === courseID ? newCourse : course
                )
                .filter(
                    (course: Course): boolean =>
                        departmentFilter === "All" ||
                        course.code.slice(0, 4) === departmentFilter
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
        setDegreeList([...degreeList, newDegree]);
    }

    // Used to add a new instance of a Year to a degree. Takes user Input for the name.
    // Typically we want the name to be "Year [1-4]" or "Freshman", "Sophomore", etc ...
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

    function changeFilter(event: React.ChangeEvent<HTMLSelectElement>) {
        setDepartmentFilter(event.target.value);

        setFilteredList(
            globalCourseList.filter(
                (course: Course): boolean =>
                    event.target.value === "All" ||
                    course.code.slice(0, 4) === event.target.value
            )
        );
        setIndex(0);
        setCurrentPage(1);
    }

    function changePage(page: number) {
        const newIndex = (page - 1) * NUM_COURSES_DISPLAYED;
        setIndex(newIndex);
    }

    function updateIndex(indx: number) {
        setIndex(indx);
        setCurrentPage(indx / NUM_COURSES_DISPLAYED + 1);
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
                            ? updateIndex(currIndex - NUM_COURSES_DISPLAYED)
                            : updateIndex(currIndex)
                    }
                >
                    Back
                </Button>
                <Form.Group controlId="formSetFilter">
                    <Form.Label>Filter: {departmentFilter}</Form.Label>
                    <Form.Select
                        onChange={changeFilter}
                        value={departmentFilter}
                    >
                        {departments.map((dept, index) => (
                            <option key={index} value={dept}>
                                {dept}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="formSetPage">
                    <Form.Label>
                        Page: {currentPage}/
                        {Math.ceil(filteredList.length / NUM_COURSES_DISPLAYED)}
                    </Form.Label>
                    <Form.Control
                        type="number"
                        value={currentPage}
                        min={1}
                        max={Math.ceil(
                            filteredList.length / NUM_COURSES_DISPLAYED
                        )}
                        onChange={(e) => {
                            setCurrentPage(parseInt(e.target.value));
                            changePage(parseInt(e.target.value));
                        }}
                    ></Form.Control>
                </Form.Group>
                <Button
                    onClick={() =>
                        currIndex < filteredList.length - NUM_COURSES_DISPLAYED
                            ? updateIndex(currIndex + NUM_COURSES_DISPLAYED)
                            : updateIndex(currIndex)
                    }
                >
                    Next
                </Button>
            </div>
            <div hidden={!courseDisplay} className="CourseList">
                {courseDisplay && (
                    <CourseList
                        courses={filteredList.slice(
                            currIndex,
                            currIndex + NUM_COURSES_DISPLAYED
                        )}
                        editCourse={editCourse}
                        switchEditing={switchEditing}
                        default_courses={defaultCourses}
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
                        defaultCourses={globalCourseList}
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
