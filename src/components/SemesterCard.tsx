import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import sample from "../data/courses.json";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { Degree } from "../interfaces/degree";
import { Year } from "../interfaces/year";

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

export const SemesterCard = ({
    semesterList,
    setSemesterList,
    setIsSemesterCard,
    idCounter,
    setIdCounter,
    degree,
    year
}: {
    semesterList: Semester[];
    setSemesterList: (
        semesterList: Semester[],
        degree: Degree,
        year: Year
    ) => void;
    setIsSemesterCard: (isSemester: boolean) => void;
    idCounter: number;
    setIdCounter: (id: number) => void;
    degree: Degree;
    year: Year;
}) => {
    const [maxCredits, setMaxCredits] = useState<number>(18);
    const [season, setSeason] = useState<string>("Fall");
    const [userYear, setYear] = useState<string>("2023");

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
        const title = `${season} Semester ${userYear}`;
        const newSemester: Semester = {
            id: idCounter,
            title: title,
            notes: "",
            maxCredits: maxCredits,
            currentCredits: 0, //variable will eventually have to be a state, so dynamic change for currentCredits
            courseList: COURSES,
            courses: []
        };
        const newSemesterList = [...semesterList, newSemester];
        setSemesterList(newSemesterList, degree, year);
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
                <Form.Select onChange={updateYear} value={userYear}>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                </Form.Select>
            </Form.Group>
            <div>
                {season} semester {userYear}: {maxCredits} credits maximum
                <div>
                    <button
                        onClick={() => {
                            saveAndExit();
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};
