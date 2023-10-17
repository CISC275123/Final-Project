import React from "react";
import { Course } from "../interfaces/course";
import "./CourseCard.css";

export const CourseCard = ({
    course,
    handleClick
}: {
    course: Course;
    handleClick: (courseID: string) => void;
}) => {
    return (
        <div className="course_view_card">
            <div>
                <h3
                    className="courseID"
                    onClick={() => handleClick(course.id.replace(/\s/g, ""))}
                >
                    {course.id} : {course.name}
                </h3>
                <p>
                    {course.credits} credit
                    {course.credits !== 1 ? "s" : ""}
                </p>
            </div>
            <p>{course.description.substring(0, 100)}...</p>
        </div>
    );
};
