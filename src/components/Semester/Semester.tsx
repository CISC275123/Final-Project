import React, { FC, useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Course } from "../../interfaces/course";
import sample from "../../data/courses.json";
import "./Semester.css";
import { SemesterCard } from "./SemesterCard";
import { SemesterView } from "./SemesterView";
import { SemesterStructure } from "../../interfaces/semester";

export interface SemesterInterfaceProps {
    semesterList: SemesterStructure[];
    setSemesterList: (list: SemesterStructure[]) => void;
    setIsSemesterCard: (isCard: boolean) => void;
}

export const Semester = () => {
    const [semesterList, setSemesterList] = useState<SemesterStructure[]>([]);
    const [isMakeSemesterCard, setIsMakeSemesterCard] =
        useState<boolean>(false);
    const [displayId, setDisplayId] = useState<null | string>(null);

    const handleCourseView = (id: string) => {
        setDisplayId(id);
    };

    const resetCourseView = () => {
        setDisplayId(null);
    };

    // useEffect(() => {
    //     const newSemester: SemesterStructure = {
    //         semesterTitle: semesterTitle,
    //         maxCredits: maxCredits,
    //         currentCredits: 0
    //     };
    //     const newSemesterList = [...semesterList, newSemester];
    //     setSemesterList(newSemesterList);
    // }, [semesterTitle, maxCredits]);

    function showMakeSemesterCard() {
        setIsMakeSemesterCard(!isMakeSemesterCard);
    }

    function hideMakeSemesterCard() {
        setIsMakeSemesterCard(!isMakeSemesterCard);
    }

    function showViewSemesterCard() {
        return <SemesterView></SemesterView>;
    }

    return (
        <div>
            <Button onClick={showMakeSemesterCard}>Add Semester</Button>
            <SemesterView></SemesterView>
            <div className="List">
                <ul>
                    {semesterList.map((semester, index) => (
                        <li key={index} onClick={showViewSemesterCard}>
                            {semester.semesterTitle}
                        </li>
                    ))}
                </ul>
            </div>
            {isMakeSemesterCard && (
                <div className="popup-container">
                    <div className="popup">
                        <SemesterCard
                            semesterList={semesterList}
                            setSemesterList={setSemesterList}
                            setIsSemesterCard={setIsMakeSemesterCard}
                        ></SemesterCard>
                        <button onClick={hideMakeSemesterCard}>Close</button>
                    </div>
                    <div className="background-overlay"></div>
                </div>
            )}
        </div>
    );
};
