import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const SemesterCard: React.FC = () => {
    const [season, setSeason] = useState<string>("Fall");
    const [maxCredits, setMaxCredits] = useState<number>(18);

    function updateSeason(event: React.ChangeEvent<HTMLSelectElement>) {
        setSeason(event.target.value);
        console.log(event.target.value);
        if (event.target.value === "Fall" || event.target.value === "Spring") {
            setMaxCredits(18);
        } else {
            setMaxCredits(6);
        }
    }

    // const updateMaxCredits => {
    //     if (season === "Fall" || season === "Spring") {
    //         setMaxCredits(18);
    //     } else {
    //         setMaxCredits(6);
    //     }
    // }

    return (
        <div>
            <Form.Group controlId="userEmotions">
                <Form.Label>Which semester is this for?</Form.Label>
                <Form.Select onChange={updateSeason} value={season}>
                    <option value="Fall">Fall</option>
                    <option value="Winter">Winter</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                </Form.Select>
            </Form.Group>
            <div>
                {" "}
                {season} semester: {maxCredits} credits maximum
                <div>
                    <Button>Add Course</Button>
                </div>
                <h3>Courses in the semester:</h3>
            </div>
        </div>
    );
};
