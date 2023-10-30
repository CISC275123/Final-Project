import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Year } from "../interfaces/year";
import { Degree } from "../interfaces/degree";

import "./DegreeView.css";
import { SemesterView } from "./SemesterView";

export const DegreeView = ({
    degree,
    resetView
}: {
    degree: Degree;
    resetView: () => void;
}) => {
    const semesterType = ["Fall", "Winter", "Spring", "Summer"];
    const testDegreeList = [
        "Course 1",
        "Course 2",
        "Course 3",
        "Course 4",
        "Course 5",
        "Course 6"
    ];
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
                    <div className="year_view_rows">
                        {degree.years.map((year: Year) => (
                            <div className="year_view_column" key={year.name}>
                                <h4>{year.name}</h4>
                                {year.semesters.map((semester) => (
                                    <SemesterView
                                        key={semester.type}
                                        type={semester.type}
                                        courses={testDegreeList}
                                    />
                                ))}
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
