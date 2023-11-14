/* eslint-disable no-extra-parens */
import React from "react";
import { Course } from "../interfaces/course";
import "./CourseCard.css";

export const CourseCard = ({
    course,
    handleClick,
    convertCredits
}: {
    course: Course;
    handleClick: (courseID: number) => void;
    convertCredits: (course: Course) => number | string;
}) => {
    return (
        <div
            className="course_view_card"
            onClick={() => handleClick(course.id)}
        >
            <div>
                <h3 className="courseID">
                    {course.code} : {course.name}
                </h3>
                <p>
                    {convertCredits(course)} credit
                    {convertCredits(course) !== 1 ? "s" : ""}
                </p>
            </div>
            <p>{course.descr.substring(0, 100)}...</p>
        </div>
    );
};
