/* eslint-disable no-extra-parens */
import React, { useEffect, useState } from "react";
import { Course } from "../../interfaces/course";
import { Button, Form } from "react-bootstrap";
import { CourseCard } from "../CourseCard";

export const SemesterAddCourse = ({
    courses,
    addedCourses,
    setAddedCourses
}: {
    courses: Course[];
    addedCourses: Course[];
    setAddedCourses: (courseList: Course[]) => void;
}) => {
    const NUM_COURSES_DISPLAYED = 3;
    const [currIndex, setIndex] = useState<number>(0);
    const [userSearchCourse, setUserSearchCourse] = useState<string>("");
    const [listCourses, setListCourses] = useState<Course[]>(courses);
    function addCourse(c: Course) {
        setAddedCourses([...addedCourses, c]);
    }

    function rmeoveCourse(c: Course) {
        const removedCourse: Course[] = addedCourses.filter(
            (course: Course): boolean => course.id !== c.id
        );
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

    const card = {
        padding: "1rem"
    };

    const button = {
        width: "100%"
    };

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
                        <div style={card} key={course.id}>
                            <CourseCard
                                handleClick={() => {
                                    null;
                                }}
                                course={course}
                                convertCredits={convertCredits}
                            ></CourseCard>
                            <Button
                                style={button}
                                onClick={() => addCourse(course)}
                            >
                                Add
                            </Button>
                        </div>
                    ))}
            </div>
            <h2>Courses in Queue:</h2>
            <div>
                {addedCourses.map((course: Course) => (
                    <div style={card} key={course.id}>
                        <CourseCard
                            handleClick={() => {
                                null;
                            }}
                            course={course}
                            convertCredits={convertCredits}
                        ></CourseCard>
                        <Button
                            style={button}
                            onClick={() => rmeoveCourse(course)}
                        >
                            Remove
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};
