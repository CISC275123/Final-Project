import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { SemesterInterfaceProps } from "./Semester";
export function SemesterCard({
    semesterList,
    setSemesterList,
    semesterTitle,
    setSemesterTitle,
    season,
    setSeason,
    year,
    setYear,
    setIsSemesterCard
}: SemesterInterfaceProps): JSX.Element {
    const [maxCredits, setMaxCredits] = useState<number>(18);
    function updateSeason(event: React.ChangeEvent<HTMLSelectElement>) {
        setSeason(event.target.value);
        if (event.target.value === "Fall" || event.target.value === "Spring") {
            setMaxCredits(18);
        } else {
            setMaxCredits(6);
        }
    }

    function updateYear(event: React.ChangeEvent<HTMLSelectElement>) {
        setYear(event.target.value);
    }

    function updateSemesterTitleExitPopupUpdateSemesterList() {
        const title = `${season} Semester ${year}`;
        setSemesterTitle(title);
        setIsSemesterCard(false);
    }

    return (
        <div>
            <Form.Group controlId="chooseSeason">
                <Form.Label>Choose the Semester</Form.Label>
                <Form.Select onChange={updateSeason} value={season}>
                    <option value="Fall">Fall</option>
                    <option value="Winter">Winter</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="chooseYear">
                <Form.Label>Choose the Year</Form.Label>
                <Form.Select onChange={updateYear} value={year}>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                </Form.Select>
            </Form.Group>
            <div>
                {" "}
                {season} semester {year}: {maxCredits} credits maximum
                <div>
                    <Button>Add Course</Button>
                </div>
                <h3>Courses in the semester:</h3>
                <button
                    onClick={updateSemesterTitleExitPopupUpdateSemesterList}
                >
                    Save
                </button>
            </div>
        </div>
    );
}
