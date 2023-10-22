import React, { FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Course } from "../../interfaces/course";
import { SemesterStructure } from "../../interfaces/semester";
import { SemesterProps } from "../../App";
import sample from "../../data/courses.json";
import "./Semester.css";
import { SemesterCard } from "./SemesterCard";

const COURSES = sample.map(
    (course): Course => ({
        id: course.id,
        name: course.name,
        credits: course.credits as unknown as number,
        prerequisites: course.prereqs as unknown as string,
        restrictions: course.restrictions as unknown as string,
        description: course.description,
        corequisites: course.coreqs as unknown as string
    })
);

export const Semester = () => {
    const [semesterList, setSemesterList] = useState<string[]>([]);
    const [semesterCounter, setSemesterCounter] = useState<number>(1);
    const [isSemesterCard, setIsSemesterCard] = useState<boolean>(false);

    function addSemester() {
        setSemesterCounter(semesterCounter + 1);
        const newSemester = "Semester " + semesterCounter;
        const newSemesterList = [...semesterList, newSemester];
        setSemesterList(newSemesterList);
    }

    function showSemesterCard() {
        setIsSemesterCard(!isSemesterCard);
    }

    function hideSemesterCard() {
        setIsSemesterCard(!isSemesterCard);
    }

    return (
        <div>
            <Button onClick={addSemester}>Add Semester</Button>
            <div className="List">
                <ul>
                    {semesterList.map((semester, index) => (
                        <li key={index} onClick={showSemesterCard}>
                            {semester}
                        </li>
                    ))}
                </ul>
            </div>
            {isSemesterCard && (
                <div className="popup-container">
                    <div className="popup">
                        <SemesterCard></SemesterCard>
                        <button onClick={hideSemesterCard}>Close</button>
                    </div>
                    <div className="background-overlay"></div>
                </div>
            )}
        </div>
    );
};
