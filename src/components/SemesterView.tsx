/* eslint-disable no-extra-parens */
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { SemesterAddCourse } from "./Semester/SemesterAddCourse";
import { Course } from "../interfaces/course";
import "./SemesterView.css";
import "./Semester/SemesterList.css";
import catalog from "../data/catalog.json";

export const SemesterView = ({
    resetView,
    semester
}: {
    resetView: () => void;
    semester: Semester;
}) => {
    const [description, setDescription] = useState<string>("");
    const [addedCourses, setAddedCourses] = useState<Course[]>([]);
    const [isAddCourses, setIsAddCourses] = useState<boolean>(false);
    const [currIndex, setIndex] = useState<number>(0);
    const NUM_COURSES_DISPLAYED = 3;

    const [baseCourses, setBaseCourses] = useState<Course[]>([]);
    // VARs used to track course department filter
    const [departmentFilter, setDepartmentFilter] = useState<string>("All");
    const [filteredList, setFilteredList] = useState<Course[]>([]);

    // VAR used to track what page in courses list the user is viewing
    const [currentPage, setCurrentPage] = useState<number>(1);
    //const [localCourses, setLocalCourses] =
    //    useState<Course[]>(globalCourseList);

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

        setBaseCourses(COURSES);
    }, []);

    function displayCourses() {
        setIsAddCourses(!isAddCourses);
    }
    function updateDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setDescription(event.target.value);
    }
    function saveInfo() {
        semester.notes = semester.notes + description;
        for (const x of addedCourses) {
            let y = 0;
            if (x.credits.includes("-")) {
                y = +x.credits.substring(x.credits.length - 1);
            } else {
                y = +x.credits;
            }
            if (
                ((semester.currentCredits + y) as unknown as number) <=
                semester.maxCredits
            ) {
                if (!semester.courses.includes(x)) {
                    semester.courses.push(x);
                    semester.currentCredits = (semester.currentCredits +
                        y) as unknown as number;
                }
            }
        }
        setAddedCourses([]);
    }
    function clearCourses() {
        setAddedCourses([]);
        semester.courses = [];
        semester.currentCredits = 0;
    }
    function removeCourse(id: string, creds: string) {
        semester.courses = semester.courses.filter((c: Course) => c.code != id);
        let y = 0;
        if (creds.includes("-")) {
            y = +creds.substring(creds.length - 1);
        } else {
            y = +creds;
        }
        semester.currentCredits = semester.currentCredits - y;
        saveInfo();
    }

    /*function changeFilter(event: React.ChangeEvent<HTMLSelectElement>) {
        setDepartmentFilter(event.target.value);

        setFilteredList(
            localCourses.filter(
                (course: Course): boolean =>
                    event.target.value === "All" ||
                    course.code.slice(0, 4) === event.target.value
            )
        );
        setIndex(0);
        setCurrentPage(1);
    }*/

    function changePage(page: number) {
        const newIndex = (page - 1) * NUM_COURSES_DISPLAYED;
        setIndex(newIndex);
    }

    return (
        <div className="SemesterviewContainer">
            <h1>
                {" "}
                {semester.title} ID: {semester.id}
            </h1>
            <h3>Maximum Credits Allowed: {semester.maxCredits} credits</h3>
            <h3>Current Credits: {semester.currentCredits} credits</h3>
            <h3>Courses: </h3>
            {semester.courses.map((c) => (
                <div key={c.code}>
                    {c.code}{" "}
                    <Button onClick={() => removeCourse(c.code, c.credits)}>
                        Remove
                    </Button>
                </div>
            ))}
            <Button className="myCustom" onClick={displayCourses}>
                Show Courses
            </Button>
            <Button className="myCustom2" onClick={clearCourses}>
                Clear Courses
            </Button>
            <Button className="myCustom3" onClick={resetView}>
                Exit
            </Button>
            <Button className="myCustom4" onClick={saveInfo}>
                Save
            </Button>
            <h2>{semester.notes}</h2>
            {!isAddCourses && (
                /*<div>
                    <Form.Group controlId="formNotes">
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
                            {Math.ceil(FileList.length / NUM_COURSES_DISPLAYED)}
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
                </div>*/
                <Form.Group controlId="formNotes">
                    <Form.Label>Notes:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={updateDescription}
                    />
                </Form.Group>
            )}
            {isAddCourses && (
                <div className="CourseButtons">
                    <Button
                        className="backCourse"
                        onClick={() =>
                            currIndex > 0
                                ? setIndex(currIndex - NUM_COURSES_DISPLAYED)
                                : setIndex(currIndex)
                        }
                    >
                        Back
                    </Button>
                    <Button
                        className="next"
                        onClick={() =>
                            currIndex <
                            baseCourses.length - NUM_COURSES_DISPLAYED
                                ? setIndex(currIndex + NUM_COURSES_DISPLAYED)
                                : setIndex(currIndex)
                        }
                    >
                        Next
                    </Button>
                </div>
            )}
            {isAddCourses && (
                <SemesterAddCourse
                    courses={baseCourses.slice(
                        //Change so that after filtered passes filtered list instead
                        currIndex,
                        currIndex + NUM_COURSES_DISPLAYED
                    )}
                    addedCourses={addedCourses}
                    setAddedCourses={setAddedCourses}
                ></SemesterAddCourse>
            )}
        </div>
    );
};
