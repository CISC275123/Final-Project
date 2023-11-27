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
    deleteYear,
    updateSemesterList
}: {
    degree: Degree;
    resetView: () => void;
    addYear: (name: string, degree: Degree) => void;
    deleteYear: (targetYear: Year, targetDegree: Degree) => void;
    updateSemesterList: (
        newSemesterList: Semester[],
        targetDegree: Degree,
        targetYear: Year
    ) => void;
}) => {
    const [isAdding, setAdding] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<string>("Freshman");

    function updateSelection(event: React.ChangeEvent<HTMLSelectElement>) {
        setUserInput(event.target.value);
    }

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
                    className="AddYear"
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
                        <Form.Select
                            onChange={updateSelection}
                            value={userInput}
                        >
                            <option value="Freshman">Freshman</option>
                            <option value="Sophomore">Sophomore</option>
                            <option value="Junior">Junior</option>
                            <option value="Senior">Senior</option>
                        </Form.Select>
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
                                <div className="moveFront">
                                    <h4 onClick={() => console.log(year.id)}>
                                        {year.name}
                                    </h4>
                                    <Button
                                        className="Deleteyear"
                                        onClick={() => deleteYear(year, degree)}
                                    >
                                        Delete Year
                                    </Button>
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
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
