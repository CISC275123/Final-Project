import React, { FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Course } from "../../interfaces/course";
import { SemesterProps } from "../../App";

export const Semester = ({ updatedAddedCourses }: SemesterProps) => {
    return (
        <div>
            <h1>Semesters</h1>
            <Button>Add Courses</Button>
            <Button>Delete Courses</Button>
            <p
                style={{
                    fontFamily: "Times New Roman",
                    fontSize: "50px",
                    fontWeight: "bold"
                }}
            >
                {updatedAddedCourses}
            </p>
        </div>
    );
};
