/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { Course } from "../interfaces/course";
import { CourseCard } from "./CourseCard";
import { CourseView } from "./CourseView";
import "./CourseList.css";

export const CourseList = ({
    courses,
    editCourse,
    switchEditing,
    default_courses,
    departments
}: {
    courses: Course[];
    editCourse: (courseID: number, newCourse: Course) => void;
    switchEditing: (edit: boolean) => void;
    default_courses: Course[];
    departments: string[];
}) => {
    const [displayId, setDisplayId] = useState<null | number>(null);

    const handleCourseView = (id: number) => {
        setDisplayId(id);
    };

    const resetCourseView = () => {
        switchEditing(false);
        setDisplayId(null);
    };

    function convertCredits(course: Course): number | string {
        const trimCred = course.credits.trim();

        if (trimCred.slice(1, 2) === "-") {
            return trimCred;
        } else {
            const cred: number = parseInt(course.credits.trim().slice(0, 1));
            return cred;
        }
    }

    return (
        <div className="course_list">
            {!displayId && (
                <>
                    {courses.map((course: Course) => (
                        <CourseCard
                            key={course.code}
                            course={course}
                            handleClick={handleCourseView}
                            convertCredits={convertCredits}
                        ></CourseCard>
                    ))}
                </>
            )}
            {courses.map((course: Course) => {
                const cId = course.id;
                if (displayId === cId) {
                    switchEditing(true);
                    return (
                        <CourseView
                            key={cId}
                            course={course}
                            editCourse={editCourse}
                            resetView={resetCourseView}
                            default_courses={default_courses}
                            convertCredits={convertCredits}
                            departments={departments}
                        ></CourseView>
                    );
                } else {
                    return null;
                }
            })}
        </div>
    );
};
