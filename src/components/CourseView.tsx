import React, { useState } from "react";
import { Course } from "../interfaces/course";
import { CourseEdit } from "./CourseEdit";
import { Button } from "react-bootstrap";
import { SemesterProps } from "../App";

export const CourseView = ({
    course,
    editCourse,
    resetView,
    default_courses
}: {
    course: Course;
    editCourse: (courseID: string, newCourse: Course) => void;
    resetView: () => void;
    default_courses: Course[];
}) => {
    const [edit, setEdit] = useState(false);

    const switchEdit = () => {
        setEdit(!edit);
    };

    return (
        <div className="quiz_card">
            <div>
                <Button
                    className="esc_button text-align-center"
                    variant="warning"
                >
                    Add
                </Button>
                <Button
                    className="esc_button text-align-center"
                    variant="warning"
                    onClick={() => {
                        switchEdit();
                    }}
                >
                    Edit
                </Button>
                <Button
                    className="esc_button text-align-center"
                    variant="danger"
                    onClick={resetView}
                >
                    {"Exit"}
                </Button>
            </div>

            {edit && (
                <CourseEdit
                    course={course}
                    editCourse={editCourse}
                    switchEdit={switchEdit}
                    resetView={resetView}
                    default_courses={default_courses}
                ></CourseEdit>
            )}
            {!edit && (
                <div className="course_view_card">
                    <div>
                        <h3 className="courseID">
                            {course.id} : {course.name}
                        </h3>
                        <p>
                            {course.credits} credit
                            {course.credits !== 1 ? "s" : ""}
                        </p>
                    </div>
                    <p>{course.description}</p>
                </div>
            )}
        </div>
    );
};
