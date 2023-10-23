import React, { FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Course } from "../../interfaces/course";
import sample from "../../data/courses.json";
import "./Semester.css";
import { SemesterCard } from "./SemesterCard";

export interface SemesterInterfaceProps {
    semesterList: string[];
    setSemesterList: (list: string[]) => void;
    semesterTitle: string;
    setSemesterTitle: (semesterTitle: string) => void;
    season: string;
    setSeason: (season: string) => void;
    year: string;
    setYear: (year: string) => void;
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
    const [semesterList, setSemesterList] = useState<string[]>(["YOOO"]);
    const [isSemesterCard, setIsSemesterCard] = useState<boolean>(false);
    const [semesterTitle, setSemesterTitle] = useState<string>("Hello");
    const [season, setSeason] = useState<string>("Fall");
    const [year, setYear] = useState<string>("2023");

    function addSemester() {
        const newSemesterList = [...semesterList, semesterTitle];
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
                            {semester}
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
                            setIsSemesterCard={setIsSemesterCard}
                        ></SemesterCard>
                        <button onClick={hideSemesterCard}>Save</button>

                        <button onClick={hideSemesterCard}>Close</button>
                    </div>
                    <div className="background-overlay"></div>
                </div>
            )}
        </div>
    );
};
