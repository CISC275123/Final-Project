/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Year } from "../interfaces/year";
import { Degree } from "../interfaces/degree";

import "./DegreeView.css";
import { SemesterList } from "./SemesterList";

import { Semester } from "../interfaces/semester";

export const DegreeView = ({
    degree,
    resetView,
    addYear,
    updateSemesterList
}: {
    degree: Degree;
    resetView: () => void;
    addYear: (name: string, degree: Degree) => void;
    updateSemesterList: (
        newSemesterList: Semester[],
        targetDegree: Degree,
        targetYear: Year
    ) => void;
}) => {
    const [isAdding, setAdding] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<string>("Year 1");

    // function updateSemesterList(
    //     newSemesterList: Semester[],
    //     degree: Degree,
    //     year: Year
    // ) {
    //     const newYear: Year = {
    //         ...year,
    //         semesters: newSemesterList
    //     };
    //     degree.years.map((y: Year): Year => (year.id === y.id ? newYear : y));
    // }

    return (
        <div className="degree_card">
            <div>
                <Button
                    className="esc_button text-align-center"
                    variant="danger"
                    onClick={resetView}
                >
                    {"Exit"}
                </Button>

                <Button
                    onClick={() => {
                        setAdding(!isAdding);
                    }}
                >
                    Add Year
                </Button>
                {isAdding && (
                    <Form.Group controlId="formAddDegree">
                        <br />
                        <Form.Label>Name your new Year:</Form.Label>
                        <Form.Control
                            type="string"
                            value={userInput}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setUserInput(event.target.value)}
                        ></Form.Control>
                        <Button
                            variant="success"
                            className="save_edit_btn"
                            onClick={() => {
                                addYear(userInput, degree);
                                setAdding(!isAdding);
                            }}
                        >
                            Save
                        </Button>
                        <Button
                            variant="warning"
                            onClick={() => setAdding(!isAdding)}
                        >
                            Cancel
                        </Button>
                    </Form.Group>
                )}
            </div>

            {true && (
                <div className="degree_page">
                    <h2>{degree.name}</h2>
                    <div className="year_view_rows">
                        {degree.years.map((year: Year) => (
                            <div className="year_view_column" key={year.name}>
                                <h4>{year.name}</h4>
                                {
                                    <SemesterList
                                        key={year.name}
                                        semesterList={year.semesters}
                                        setSemesterList={updateSemesterList}
                                        degree={degree}
                                        year={year}
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
