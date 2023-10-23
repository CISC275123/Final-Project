import React, { FC, useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Course } from "../../interfaces/course";
import sample from "../../data/courses.json";
import "./Semester.css";
import { SemesterCard } from "./SemesterCard";
import { SemesterStructure } from "../../interfaces/semester";

export interface SemesterInterfaceProps {
    semesterList: SemesterStructure[];
    setSemesterList: (list: SemesterStructure[]) => void;
    semesterTitle: string;
    setSemesterTitle: (semesterTitle: string) => void;
    season: string;
    setSeason: (season: string) => void;
    year: string;
    setYear: (year: string) => void;
    maxCredits: number;
    setMaxCredits: (credits: number) => void;
    setIsSemesterCard: (isCard: boolean) => void;
}

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
    const [semesterList, setSemesterList] = useState<SemesterStructure[]>([]);
    const [isSemesterCard, setIsSemesterCard] = useState<boolean>(false);
    const [semesterTitle, setSemesterTitle] = useState<string>("Hi");
    const [maxCredits, setMaxCredits] = useState<number>(18);
    const [season, setSeason] = useState<string>("Fall");
    const [year, setYear] = useState<string>("2023");

    // useEffect(() => {
    //     const newSemester: SemesterStructure = {
    //         semesterTitle: semesterTitle,
    //         maxCredits: maxCredits,
    //         currentCredits: 0
    //     };
    //     const newSemesterList = [...semesterList, newSemester];
    //     setSemesterList(newSemesterList);
    // }, [semesterTitle, maxCredits]);

    function addSemester() {
        const newSemester: SemesterStructure = {
            semesterTitle: semesterTitle,
            maxCredits: maxCredits,
            currentCredits: 0
            // courseList: COURSES
        };
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
            <Button onClick={showSemesterCard}>Add Semester</Button>
            <Button onClick={addSemester}>Add Semester TEST</Button>

            <div className="List">
                <ul>
                    {semesterList.map((semester, index) => (
                        <li key={index} onClick={showSemesterCard}>
                            {semester.semesterTitle}
                        </li>
                    ))}
                </ul>
            </div>
            {isSemesterCard && (
                <div className="popup-container">
                    <div className="popup">
                        <SemesterCard
                            semesterList={semesterList}
                            setSemesterList={setSemesterList}
                            semesterTitle={semesterTitle}
                            setSemesterTitle={setSemesterTitle}
                            season={season}
                            setSeason={setSeason}
                            year={year}
                            setYear={setYear}
                            maxCredits={maxCredits}
                            setMaxCredits={setMaxCredits}
                            setIsSemesterCard={setIsSemesterCard}
                        ></SemesterCard>
                        <button onClick={hideSemesterCard}>Close</button>
                    </div>
                    <div className="background-overlay"></div>
                </div>
            )}
        </div>
    );
};
