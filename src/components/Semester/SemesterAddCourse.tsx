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
    addedCourses: Course[];
    setAddedCourses: (courseList: Course[]) => void;
}) => {
    function addCourse(c: Course) {
        const newAddedCourse = [...addedCourses, c];
        setAddedCourses(newAddedCourse);
    }
    return (
        <div>
            <h2>Available Semester Courses</h2>
            <div>
                {courses.map((course: Course) => (
                    <div key={course.name}>
                        {course.id} ({course.credits} Credits){" "}
                        <Button onClick={() => addCourse(course)}>Add</Button>
                    </div>
                ))}
            </div>
            <h2>Courses in Queue:</h2>
            <div>
                {addedCourses.map((c: Course) => (
                    <div key={c.id}>
                        {c.id} ({c.credits} credits)
                    </div>
                ))}
            </div>
        </div>
    );
};
