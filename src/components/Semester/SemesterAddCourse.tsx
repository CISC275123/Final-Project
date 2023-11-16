/* eslint-disable no-extra-parens */
import React from "react";
import { Course } from "../../interfaces/course";
import { Button } from "react-bootstrap";
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
    function addCourse(c: Course) {
        const newAddedCourse = [...addedCourses, c];
        setAddedCourses(newAddedCourse);
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

    return (
        <div>
            <h2>Available Semester Courses</h2>
            <div>
                {courses.map((course: Course) => (
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
