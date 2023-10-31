import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import sample from "../../data/courses.json";
import { SemesterInterfaceProps } from "./SemesterList";
import { Semester } from "../../interfaces/semester";
import { Course } from "../../interfaces/course";

const COURSES = sample.map(
    (course): Course => ({
        id: course.id,
        name: course.name,
        credits: course.credits as unknown as number,
        prerequisites: [course.prereqs as unknown as string],
        restrictions: course.restrictions as unknown as string,
        description: course.description,
        corequisites: [course.coreqs as unknown as string]
    })
);

export function SemesterCard({
    semesterList,
    setSemesterList,
    setIsSemesterCard,
    idCounter,
    setIdCounter
}: SemesterInterfaceProps): JSX.Element {
    const [maxCredits, setMaxCredits] = useState<number>(18);
    const [season, setSeason] = useState<string>("Fall");
    const [year, setYear] = useState<string>("2023");

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

    function saveAndExit() {
        const newID = idCounter + 1;
        setIdCounter(newID);
        const title = `${season} Semester ${year}`;
        const newSemester: Semester = {
            id: idCounter,
            title: title,
            notes: "",
            maxCredits: maxCredits,
            currentCredits: 0, //variable will eventually have to be a state, so dynamic change for currentCredits
            courseList: COURSES
        };
        const newSemesterList = [...semesterList, newSemester];
        setSemesterList(newSemesterList);
        setIsSemesterCard(false);
    }

    return (
        <div>
            <Form.Group controlId="chooseSeason">
                <Form.Label>Semester</Form.Label>
                <Form.Select onChange={updateSeason} value={season}>
                    <option value="Fall">Fall</option>
                    <option value="Winter">Winter</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="chooseYear">
                <Form.Label>Year</Form.Label>
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
                    onClick={() => {
                        saveAndExit();
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    );
}
