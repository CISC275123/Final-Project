import React, { useState } from "react";
import { Semester } from "../../interfaces/semester";
import { Course } from "../../interfaces/course";
import { Button } from "react-bootstrap";

export const SemesterAddCourse = ({
    courses,
    addedCourses,
    setAddedCourses
}: {
    courses: Course[];
    addedCourses: string[];
    setAddedCourses: (courseList: string[]) => void;
}) => {
    function addCourse(c: Course) {
        const newCourse = c.name + ", " + c.credits + " credits";
        const newAddedCourse = [...addedCourses, newCourse];
        setAddedCourses(newAddedCourse);
    }

    return (
        <div>
            Available Semester Courses
            <div>
                {courses.map((course: Course) => (
                    <div key={course.name}>
                        {course.name} ({course.credits} Credits){" "}
                        <Button onClick={() => addCourse(course)}>Add</Button>
                    </div>
                ))}
            </div>
        </div>
    );
};
