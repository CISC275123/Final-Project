/* eslint-disable no-extra-parens */
import React, { useEffect, useState } from "react";
import { Course } from "../interfaces/course";
import { Button, Form } from "react-bootstrap";
import { CourseList } from "./CourseList";
import "./CourseDisplay.css";
import catalog from "../data/catalog.json";

const NUM_COURSES_DISPLAYED = 3;

export const CourseDisplay = ({
    updateGlobalCourseList,
    globalCourseList,
    departments
}: {
    updateGlobalCourseList: (newList: Course[]) => void;
    globalCourseList: Course[];
    departments: string[];
}) => {
    const [localCourses, setLocalCourses] =
        useState<Course[]>(globalCourseList);

    // VAR used to hold the default course list with NO edits.
    const [defaultCourses, setDefaultCourses] = useState<Course[]>([]);

    // VARs used to control display of elements
    const [isEditing, setEditing] = useState<boolean>(false);

    // Index used to scroll through the display of courses
    const [currIndex, setIndex] = useState<number>(0);

    // VARs used to track course department filter
    const [departmentFilter, setDepartmentFilter] = useState<string>("All");
    const [filteredList, setFilteredList] =
        useState<Course[]>(globalCourseList);

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

        setDefaultCourses(COURSES);
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
        if (departmentFilter === "All") {
            const newList: Course[] = localCourses.map(
                (course: Course): Course =>
                    course.id === courseID ? newCourse : course
            );
            updateGlobalCourseList(newList);
            setLocalCourses(newList);
            setFilteredList(newList);
        } else {
            // List is filtered to number of courses that match Department selected. Need to treat it differently.
            const newList: Course[] = filteredList.map(
                (course: Course): Course =>
                    course.id === courseID ? newCourse : course
            );
            setFilteredList(newList);

            const updatedLocalList = localCourses.map((localCourse) => {
                // Check if there is a matching course in newList
                const matchingCourse = newList.find(
                    (newCourse) => newCourse.id === localCourse.id
                );

                // If there is a match, replace the course in localList with the updated course from newList
                if (matchingCourse) {
                    return matchingCourse;
                }

                // If there is no match, keep the original course in localList
                return localCourse;
            });

            updateGlobalCourseList(updatedLocalList);
            setLocalCourses(updatedLocalList);
        }
    }

    // Used to display/hide the relevant buttons when editing a course. Takes in a boolean to set the value of isEditing to.
    function switchEditing(edit: boolean) {
        setEditing(edit);
    }

    function changeFilter(event: React.ChangeEvent<HTMLSelectElement>) {
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
        <div>
            <div hidden={isEditing} className="CourseButtons">
                <Button
                    className="backCourseDisplay"
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
                    className="nextCourseDisplay"
                    onClick={() =>
                        currIndex < filteredList.length - NUM_COURSES_DISPLAYED
                            ? updateIndex(currIndex + NUM_COURSES_DISPLAYED)
                            : updateIndex(currIndex)
                    }
                >
                    Next
                </Button>
            </div>
            <div className="CourseList">
                {
                    <CourseList
                        courses={filteredList.slice(
                            currIndex,
                            currIndex + NUM_COURSES_DISPLAYED
                        )}
                        editCourse={editCourse}
                        switchEditing={switchEditing}
                        default_courses={defaultCourses}
                        departments={departments}
                    ></CourseList>
                }
            </div>
        </div>
    );
};
