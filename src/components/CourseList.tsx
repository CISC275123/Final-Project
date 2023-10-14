import React from "react";
import { Course } from "../interfaces/course";
import { CourseCard } from "./CourseCard";

import "./CourseList.css";

export const CourseList = ({ courses }: { courses: Course[] }) => {
    return (
        <div className="course_list">
            {
                <>
                    {courses.map((course: Course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                        ></CourseCard>
                    ))}
                </>
            }
        </div>
    );
};
