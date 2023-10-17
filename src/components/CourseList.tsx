import React, { useState } from "react";
import { Course } from "../interfaces/course";
import { CourseCard } from "./CourseCard";
import { CourseView } from "./CourseView";
import "./CourseList.css";

export const CourseList = ({
    courses,
    editCourse
}: {
    courses: Course[];
    editCourse: (courseID: string, newCourse: Course) => void;
}) => {
    const [displayId, setDisplayId] = useState<null | string>(null);

    const handleCourseView = (id: string) => {
        setDisplayId(id);
    };

    const resetCourseView = () => {
        setDisplayId(null);
    };

    return (
        <div className="course_list">
            {!displayId && (
                <>
                    {courses.map((course: Course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            handleClick={handleCourseView}
                        ></CourseCard>
                    ))}
                </>
            )}
            {courses.map((course: Course) => {
                const cId = course.id.replace(/\s/g, "");
                if (displayId === cId) {
                    return (
                        <CourseView
                            key={cId}
                            course={course}
                            editCourse={editCourse}
                            resetView={resetCourseView}
                        ></CourseView>
                    );
                } else {
                    return null;
                }
            })}
        </div>
    );
};
