/* eslint-disable no-extra-parens */
import React, { ChangeEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Degree } from "../interfaces/degree";
import { DegreeCard } from "./DegreeCard";
import { DegreeView } from "./DegreeView";

import "./DegreeList.css";
import { Semester } from "../interfaces/semester";
import { Year } from "../interfaces/year";

// import { DegreeBase } from "../interfaces/degreebase";
// import degreebases from "../data/degrees.json";

export const DegreeList = ({
    isDataSaved,
    degrees,
    addDegree,
    addYear,
    deleteYear,
    removeDegree,
    updateSemesterList
}: {
    isDataSaved: boolean;
    degrees: Degree[];
    addDegree: (name: string, degrees: Degree[], plan: string) => void;
    deleteYear: (targetYear: Year, targetDegree: Degree) => void;
    removeDegree: (id: number) => void;
    addYear: (name: string, degree: Degree) => void;
    updateSemesterList: (
        newSemesterList: Semester[],
        targetDegree: Degree,
        targetYear: Year
    ) => void;
}) => {
    const [displayId, setDisplayId] = useState<null | number>(null);
    const [userInputName, setUserInputName] = useState<string>("Sample Degree");
    // const [userInputPlan, setUserInputPlan] = useState<string>("CS BA");
    const [isAdding, setIsAdding] = useState<boolean>(false);

    // const [plans, setPlans] = useState<Record<string, DegreeBase>>();

    // useEffect(() => {
    //     const data: Record<string, DegreeBase> = degreebases;
    //     setPlans(data);
    // }, []);

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
        addDegree(userInputName, [], "");
        handleAddClick();
    };

    const SaveDegrees: React.FC<{ degrees: Degree[] }> = ({ degrees }) => {
        const downloadDegrees = () => {
            const degreesJson = JSON.stringify(degrees, null, 2); // The third argument is for pretty formatting with 2 spaces

            const blob = new Blob([degreesJson], { type: "application/json" });
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "degrees.json";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Revoke the ObjectURL to free up resources
            URL.revokeObjectURL(url);
        };

        return <Button onClick={downloadDegrees}>Save Degrees</Button>;
    };

    const UploadDegreesButton: React.FC<{
        onUpload: (degrees: Degree[]) => void;
    }> = ({ onUpload }) => {
        const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    try {
                        const degreesJson = e.target?.result as string;
                        const parsedDegrees = JSON.parse(degreesJson);

                        // Validate the structure if needed
                        // For example, check if parsedDegrees is an array of Degree objects

                        onUpload(parsedDegrees);
                    } catch (error) {
                        console.error("Error parsing JSON file:", error);
                    }
                };

                reader.readAsText(file);
            }
        };

        return (
            <div>
                <label htmlFor="fileInput">Upload Your Plans</label>
                <br />
                <input
                    type="file"
                    id="fileInput"
                    accept=".json"
                    onChange={handleFileUpload}
                />
            </div>
        );
    };

    function handleUpload(degrees: Degree[]) {
        addDegree("", degrees, "");
    }

    const clearLocalStorage = () => {
        localStorage.clear();
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
                            value={userInputName}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setUserInputName(event.target.value)}
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
                {!displayId && (
                    <div>
                        <SaveDegrees degrees={degrees} />
                        <UploadDegreesButton onUpload={handleUpload} />
                        <Button onClick={clearLocalStorage}>
                            Clear Storage
                        </Button>
                    </div>
                )}
                {degrees.map((degree: Degree) => {
                    const dId = degree.id;
                    if (displayId === dId) {
                        return (
                            <DegreeView
                                isDataSaved={isDataSaved}
                                key={degree.id}
                                degree={degree}
                                resetView={resetDegreeView}
                                addYear={addYear}
                                deleteYear={deleteYear}
                                updateSemesterList={updateSemesterList}
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
