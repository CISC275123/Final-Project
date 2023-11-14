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
        <div
            className="course_view_card"
            onClick={() => handleClick(course.code.replace(/\s/g, ""))}
        >
            <div>
                <h3 className="courseID">
                    {course.code} : {course.name}
                </h3>
                <p>
                    {course.credits} credit
                    {(course.credits as unknown as number) !== 1 ? "s" : ""}
                </p>
            </div>
            <p>{course.descr.substring(0, 100)}...</p>
        </div>
    );
};
