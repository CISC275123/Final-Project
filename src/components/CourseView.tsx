import React, { useState } from "react";
import { Course } from "../interfaces/course";
import { CourseEdit } from "./CourseEdit";
import { Button } from "react-bootstrap";

export const CourseView = ({
    course,
    editCourse,
    resetView,
    switchEditing
}: {
    course: Course;
    editCourse: (courseID: string, newCourse: Course) => void;
    resetView: () => void;
    switchEditing: (edit: boolean) => void;
}) => {
    const [edit, setEdit] = useState(false);

    const switchEdit = () => {
        setEdit(!edit);
        switchEditing(!edit);
    };

    return (
        <div className="quiz_card">
            <div>
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
