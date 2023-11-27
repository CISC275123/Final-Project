/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Degree } from "../interfaces/degree";
import { DegreeCard } from "./DegreeCard";
import { DegreeView } from "./DegreeView";

import "./DegreeList.css";
import { Semester } from "../interfaces/semester";
import { Year } from "../interfaces/year";
import { Course } from "../interfaces/course";

export const DegreeList = ({
    degrees,
    addDegree,
    addYear,
    deleteYear,
    removeDegree,
    updateSemesterList,
    defaultCourses
}: {
    degrees: Degree[];
    addDegree: (name: string) => void;
    deleteYear: (targetYear: Year, targetDegree: Degree) => void;
    removeDegree: (id: number) => void;
    addYear: (name: string, degree: Degree) => void;
    updateSemesterList: (
        newSemesterList: Semester[],
        targetDegree: Degree,
        targetYear: Year
    ) => void;
    defaultCourses: Course[];
}) => {
    const [displayId, setDisplayId] = useState<null | number>(null);
    const [userInput, setUserInput] = useState<string>("Sample Degree");
    const [isAdding, setIsAdding] = useState<boolean>(false);

    const handleDegreeView = (id: number) => {
        setDisplayId(id);
    };

    const resetDegreeView = () => {
        setDisplayId(null);
    };

    const handleAddClick = () => {
        setIsAdding(!isAdding);
    };

    const setUpDegree = () => {
        addDegree(userInput);
        handleAddClick();
    };

    const SaveDegrees: React.FC<{ degrees: Degree[] }> = ({ degrees }) => {
        const downloadDegrees = () => {
            const degreesJson = JSON.stringify(degrees, null, 2); // The third argument is for pretty formatting with 2 spaces

            const blob = new Blob([degreesJson], { type: "application/json" });
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "degrees.json";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Revoke the ObjectURL to free up resources
            URL.revokeObjectURL(url);
        };

        return <Button onClick={downloadDegrees}>Save Degrees</Button>;
    };

    return (
        <div className="degree_page">
            <div className="degree_buttons">
                <Button
                    className="degreeAddbutton"
                    hidden={displayId !== null}
                    onClick={handleAddClick}
                >
                    Add
                </Button>
                {isAdding && (
                    <Form.Group controlId="formAddDegree">
                        <br />
                        <Form.Label>
                            Give your new degree plan a memorable name:
                        </Form.Label>
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
                            onClick={setUpDegree}
                        >
                            Save
                        </Button>
                        <Button variant="warning" onClick={handleAddClick}>
                            Cancel
                        </Button>
                    </Form.Group>
                )}
            </div>
            <div className="degree_list">
                {!displayId && (
                    <>
                        {degrees.map((degree: Degree) => (
                            <DegreeCard
                                key={degree.id}
                                degree={degree}
                                handleClick={handleDegreeView}
                                removeDegree={removeDegree}
                            ></DegreeCard>
                        ))}
                    </>
                )}
                {!displayId && <SaveDegrees degrees={degrees} />}
                {degrees.map((degree: Degree) => {
                    const dId = degree.id;
                    if (displayId === dId) {
                        return (
                            <DegreeView
                                key={degree.id}
                                degree={degree}
                                resetView={resetDegreeView}
                                addYear={addYear}
                                deleteYear={deleteYear}
                                updateSemesterList={updateSemesterList}
                                defaultCourses={defaultCourses}
                            ></DegreeView>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    );
};
