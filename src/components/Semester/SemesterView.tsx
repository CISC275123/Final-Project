import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Semester } from "../../interfaces/semester";
import { SemesterAddCourse } from "./SemesterAddCourse";

export const SemesterView = ({
    resetView,
    semester
}: {
    resetView: () => void;
    semester: Semester;
}) => {
    const [description, setDescription] = useState<string>("");
    const [isAddCourses, setIsAddCourses] = useState<boolean>(false);

    function displayCourses() {
        setIsAddCourses(!isAddCourses);
        //for next Sprint to accomplish
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
            <h3>Maximum Credits Allowed: {semester.maxCredits} credits</h3>
            <h3>Current Credits: {semester.currentCredits} credits</h3>
            <Button onClick={displayCourses}>Add Course</Button>
            <Button onClick={displayCourses}>Clear Courses</Button>
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
            {isAddCourses && <SemesterAddCourse></SemesterAddCourse>}
        </div>
    );
};
