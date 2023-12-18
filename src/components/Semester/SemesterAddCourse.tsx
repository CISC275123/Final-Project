/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { Course } from "../../interfaces/course";
import { Button, Form } from "react-bootstrap";
import { CourseCard } from "../CourseCard";
import "./SemesterAddCourse.css";
import { Semester } from "../../interfaces/semester";

export const SemesterAddCourse = ({
    courses,
    addedCourses,
    setAddedCourses,
    addedCredits,
    setAddedCredits,
    semester
}: {
    courses: Course[];
    addedCourses: Course[];
    setAddedCourses: (courseList: Course[]) => void;
    addedCredits: number;
    setAddedCredits: (x: number) => void;
    semester: Semester;
}) => {
    const NUM_COURSES_DISPLAYED = 3;
    const [currIndex, setIndex] = useState<number>(0);
    const [userSearchCourse, setUserSearchCourse] = useState<string>("");
    const [listCourses, setListCourses] = useState<Course[]>(courses);
    function addCourse(c: Course) {
        let y = 0;
        if (c.credits.includes("-")) {
            const x = +c.credits.substring(c.credits.length - 1);
            y = +x;
        } else {
            y = +c.credits;
        }
        if (addedCourses.some((item) => item.id === c.id)) {
            alert("This course has already been added to the queue");
        } else if (semester.courses.some((item) => item.id === c.id)) {
            alert("This course is already in the semester");
        } else if (semester.currentCredits + addedCredits + y > 18) {
            alert("Too many credits added to queue exceeded semester limit.");
        } else {
            // Check for prerequisite and restriction warnings
            if (c.preReq !== "") {
                alert(
                    "Warning: Please make sure you meet these prerequisite courses: " +
                        c.preReq
                );
            } else if (c.restrict !== "") {
                alert(
                    "Warning: Please make sure you are eligible. This course has the following restrictions: " +
                        c.restrict
                );
            }

            // Add course and update credits
            if (c.credits.includes("-")) {
                setAddedCredits(addedCredits + y);
            } else {
                setAddedCredits(addedCredits + +c.credits);
            }
            setAddedCourses([...addedCourses, c]);
        }
    }

    function rmeoveCourse(c: Course) {
        const removedCourse: Course[] = addedCourses.filter(
            (course: Course): boolean => course.id !== c.id
        );
        let y = 0;
        if (c.credits.includes("-")) {
            const x = +c.credits.substring(c.credits.length - 1);
            y = +x;
        } else {
            y = +c.credits;
        }
        setAddedCredits(addedCredits - y);
        setAddedCourses(removedCourse);
    }
    function convertCredits(course: Course): number | string {
        const trimCred = course.credits.trim();

        if (trimCred.slice(1, 2) === "-") {
            return trimCred;
        } else {
            const cred: number = parseInt(course.credits.trim().slice(0, 1));
            return cred;
        }
    }

    function searchCourses(search: string) {
        const filteredCourses = courses.filter(
            (course: Course): boolean =>
                course.code
                    .replace(/\s/g, "")
                    .slice(0, search.length)
                    .toLowerCase() === search.toLowerCase()
        );

        setListCourses(filteredCourses);

        setIndex(0);
    }

    function resetCourses() {
        setListCourses(courses);
        setUserSearchCourse("");
    }

    function changeIndex(newIndx: number) {
        setIndex(newIndx);
    }

    return (
        <div>
            <h2>Available Semester Courses</h2>
            <div>
                <Form.Group controlId="formSearchCourse">
                    <br />
                    <Form.Label>Search for a course:</Form.Label>
                    <Form.Control
                        type="string"
                        value={userSearchCourse}
                        placeholder="Enter Course ID"
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            setUserSearchCourse(event.target.value);
                            searchCourses(event.target.value);
                        }}
                    ></Form.Control>
                    <br />
                    <Button variant="warning" onClick={resetCourses}>
                        Reset
                    </Button>
                </Form.Group>
                {true && (
                    <div className="CourseButtons">
                        <Button
                            className="backCourse"
                            onClick={() =>
                                changeIndex(
                                    currIndex > 0
                                        ? currIndex - NUM_COURSES_DISPLAYED
                                        : currIndex
                                )
                            }
                        >
                            Back
                        </Button>
                        <Button
                            className="next"
                            onClick={() =>
                                changeIndex(
                                    currIndex <
                                        listCourses.length -
                                            NUM_COURSES_DISPLAYED
                                        ? currIndex + NUM_COURSES_DISPLAYED
                                        : currIndex
                                )
                            }
                        >
                            Next
                        </Button>
                    </div>
                )}
                {listCourses
                    .slice(currIndex, currIndex + NUM_COURSES_DISPLAYED)
                    .map((course: Course) => (
                        <div className="addCourseCard" key={course.id}>
                            <CourseCard
                                handleClick={() => {
                                    null;
                                }}
                                course={course}
                                convertCredits={convertCredits}
                            ></CourseCard>
                            <Button onClick={() => addCourse(course)}>
                                Add
                            </Button>
                        </div>
                    ))}
            </div>
            <h2>Courses in Queue: ({addedCredits} credits)</h2>
            <div>
                {addedCourses.map((course: Course) => (
                    <div className="addCourseCard" key={course.code}>
                        <CourseCard
                            handleClick={() => {
                                null;
                            }}
                            course={course}
                            convertCredits={convertCredits}
                        ></CourseCard>
                        <Button onClick={() => rmeoveCourse(course)}>
                            Remove
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};
