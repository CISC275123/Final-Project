import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Year } from "../interfaces/year";
import { Degree } from "../interfaces/degree";
import { Semester } from "../interfaces/semester";

export const SemesterView = ({
    type,
    courses
}: {
    type: string;
    courses: string[];
}) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    return (
        <div className="semester_type">
            <p>{type}</p>
            <button onClick={toggleVisibility}>
                {visible ? "Hide" : "Show"}
            </button>
            {visible && (
                <div className="degree">
                    {courses.map((course: string) => (
                        <div className="course" key={course}>
                            {course}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
