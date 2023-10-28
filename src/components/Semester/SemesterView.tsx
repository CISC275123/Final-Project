import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { SemesterStructure } from "../../interfaces/semester";

export const SemesterView = ({
    resetView,
    semester
}: {
    resetView: () => void;
    semester: SemesterStructure;
}) => {
    const [description, setDescription] = useState<string>("");

    function displayCourses() {
        resetView();
    }
    function updateDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setDescription(event.target.value);
    }
    function saveInfo() {
        semester.notes = semester.notes + description;
        resetView();
    }
    return (
        <div>
            <h1>
                {" "}
                {semester.title} ID: {semester.id}
            </h1>
            <Button onClick={displayCourses}>Add Courses</Button>
            <Button onClick={resetView}>Exit</Button>
            <Button onClick={saveInfo}>Save</Button>
            <h2>Courses Added: </h2>
            <h2>The result of notes: {semester.notes}</h2>
            <Form.Group controlId="formNotes">
                <Form.Label>Notes:</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={updateDescription}
                />
            </Form.Group>
        </div>
    );
};
