import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Year } from "../interfaces/year";
import { Degree } from "../interfaces/degree";

import "./DegreeView.css";
import { SemesterList } from "./SemesterList";

import sample from "../data/courses.json";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";

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
    resetView,
    addYear
}: {
    degree: Degree;
    resetView: () => void;
    addYear: (name: string, degree: Degree) => void;
}) => {
    const [isAdding, setAdding] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<string>("Year 1");

    function updateSemesterList(
        newSemesterList: Semester[],
        degree: Degree,
        year: Year
    ) {
        null;
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
