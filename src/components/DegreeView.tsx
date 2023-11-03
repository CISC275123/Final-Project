import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Year } from "../interfaces/year";
import { Degree } from "../interfaces/degree";

import "./DegreeView.css";
import { SemesterView } from "./Semester/SemesterView";
import { Semester } from "../interfaces/semester";
import { SemesterList } from "./Semester/SemesterList";

import sample from "../data/courses.json";
import { Course } from "../interfaces/course";

const COURSES = sample.map(
    (course): Course => ({
        id: course.id,
        name: course.name,
        credits: course.credits as unknown as number,
        prerequisites: course.prereqs as unknown as string[],
        restrictions: course.restrictions as unknown as string,
        description: course.description,
        corequisites: course.coreqs as unknown as string[]
    })
);

export const DegreeView = ({
    degree,
    resetView
}: {
    degree: Degree;
    resetView: () => void;
}) => {
    const [visible, setVisible] = useState<boolean>(true);
    const [edit, setEdit] = useState(false);

    const switchEdit = () => {
        setEdit(!edit);
    };

    function flipVisibility(): void {
        setVisible(!visible);
    }

    return (
        <div className="degree_card">
            <div>
                {/* <Button
                    className="esc_button text-align-center"
                    variant="warning"
                    onClick={() => {
                        switchEdit();
                    }}
                >
                    Edit
                </Button> */}
                <Button
                    className="esc_button text-align-center"
                    variant="danger"
                    onClick={resetView}
                >
                    {"Exit"}
                </Button>
            </div>

            {!edit && (
                <div className="degree_page">
                    <h2>{degree.name}</h2>
                    <div className="year_view_rows">
                        {degree.years.map((year: Year) => (
                            <div className="year_view_column" key={year.name}>
                                <h4>{year.name}</h4>
                                {
                                    <SemesterList
                                        key={year.name}
                                        courses={COURSES}
                                    />
                                }
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

{
    /* <Button
                    className="esc_button text-align-center"
                    variant="warning"
                    onClick={() => {
                        switchEdit();
                    }}
                >
                    Edit
                </Button> */
}
