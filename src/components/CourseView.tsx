/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { Course } from "../interfaces/course";
import { CourseEdit } from "./CourseEdit";
import { Button } from "react-bootstrap";

import "./CourseView.css";

export const CourseView = ({
    course,
    editCourse,
    resetView,
    default_courses,
    handleClick
}: {
    course: Course;
    editCourse: (courseID: number, newCourse: Course) => void;
    resetView: () => void;
    default_courses: Course[];
    handleClick: (id: number) => void;
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
                    variant="danger"
                    onClick={resetView}
                >
                    {"Exit"}
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
            </div>

            {edit && (
                <CourseEdit
                    course={course}
                    editCourse={editCourse}
                    switchEdit={switchEdit}
                    default_courses={default_courses}
                ></CourseEdit>
            )}
            {!edit && (
                <div className="course_view_card">
                    <div>
                        <h3 className="courseID">
                            {course.code} : {course.name}
                        </h3>
                        <p>
                            {course.credits} credit
                            {(course.credits as unknown as number) !== 1
                                ? "s"
                                : ""}
                        </p>
                    </div>
                    <p>{course.descr}</p>

                    <br />

                    <div className="reqs_list">
                        <h2>Prerequisites</h2>
                        <h5 className="reqs">
                            {course.preReq === ""
                                ? "No Requirements"
                                : course.preReq}
                        </h5>
                        <h2>Restrictions</h2>
                        <h5 className="restrictions">
                            {course.restrict === ""
                                ? "No Restrictions"
                                : course.restrict}
                        </h5>
                    </div>
                </div>
            )}
        </div>
    );
};
