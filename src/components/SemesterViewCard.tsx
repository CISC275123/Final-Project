import React from "react";
import { Button } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import "./SemesterViewCard.css";

export const SemesterViewCard = ({
    semester,
    handleView,
    removeSemester
}: {
    semester: Semester;
    handleView: (id: number) => void;
    removeSemester: (id: number) => void;
}) => {
    return (
        <div className="semester_view_card">
            <h3 className="degreeName">{semester.title}</h3>
            <Button
                onClick={() => {
                    handleView(semester.id);
                }}
            >
                Edit Semester
            </Button>{" "}
            <Button onClick={() => removeSemester(semester.id)}>
                Delete Semester
            </Button>
            <div>
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
