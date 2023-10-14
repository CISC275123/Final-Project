import React from "react";
import { Course } from "../interfaces/course";
import "./CourseCard.css";

export const CourseCard = ({ course }: { course: Course }) => {
    return (
        <div className="course_view_card">
            <div className="d-flex align-items-baseline">
                <h3 className="courseID">
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
