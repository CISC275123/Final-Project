import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Degree } from "../interfaces/degree";
import { DegreeCard } from "./DegreeCard";
import { DegreeView } from "./DegreeView";

import "./DegreeList.css";

export const DegreeList = ({
    degrees,
    addDegree,
    removeDegree
}: {
    degrees: Degree[];
    addDegree: (name: string) => void;
    removeDegree: (id: number) => void;
}) => {
    const [displayId, setDisplayId] = useState<null | number>(null);
    const [userInput, setUserInput] = useState<string>("Sample");
    const [adding, setAdding] = useState<boolean>(false);

    const handleDegreeView = (id: number) => {
        setDisplayId(id);
    };

    const resetDegreeView = () => {
        setDisplayId(null);
    };

    const handleAddClick = () => {
        setAdding(!adding);
    };

    const setUpDegree = () => {
        addDegree(userInput);
        handleAddClick();
    };

    return (
        <div className="degree_page">
            <div className="degree_buttons">
                <Button hidden={displayId !== null} onClick={handleAddClick}>
                    Add
                </Button>
                {adding && (
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
                {degrees.map((degree: Degree) => {
                    const dId = degree.id;
                    if (displayId === dId) {
                        return (
                            <DegreeView
                                degree={degree}
                                resetView={resetDegreeView}
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
