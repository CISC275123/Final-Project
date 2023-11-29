/* eslint-disable no-extra-parens */
import React from "react";
import { Button } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import "./SemesterViewCard.css";
import "./DegreeView.css";

export const SemesterViewCard = ({
    semester,
    handleView,
    toggle,
    removeSemester
}: {
    semester: Semester;
    handleView: (id: number) => void;
    toggle: (id: number) => void;
    removeSemester: (id: number) => void;
}) => {
    return (
        <div className="semester_view_card">
            <h3 className="degreeName">{semester.title}</h3>
            <h6 className="credits">
                Current Registered Credits: {semester.currentCredits}
            </h6>
            <Button
                className="sampleDegreeButtons"
                onClick={() => {
                    handleView(semester.id);
                }}
            >
                Edit Semester
            </Button>{" "}
            <Button
                className="sampleDegreeButtons"
                onClick={() => removeSemester(semester.id)}
            >
                Delete Semester
            </Button>{" "}
            <Button
                className="sampleDegreeButtons"
                onClick={() => toggle(semester.id)}
            >
                Show Courses
            </Button>
            <div id={semester.id.toString()}>
                <ul>
                    {semester.courses.map((course: Course) => (
                        <li key={course.id}>
                            {course.code}: {course.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
