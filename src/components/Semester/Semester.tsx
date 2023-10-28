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
    idCounter: number;
    setIdCounter: (num: number) => void;
}

export const Semester = () => {
    const [semesterList, setSemesterList] = useState<SemesterStructure[]>([]);
    const [isMakeSemesterCard, setIsMakeSemesterCard] =
        useState<boolean>(false);
    const [displayId, setDisplayId] = useState<null | number>(null);
    const [idCounter, setIdCounter] = useState<number>(1);

    const handleCourseView = (id: number) => {
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

    return (
        <div>
            <Button onClick={showMakeSemesterCard}>Add Semester</Button>
            <div className="List">
                <ul>
                    {!displayId && (
                        <>
                            {" "}
                            {semesterList.map((semester: SemesterStructure) => (
                                <li
                                    className="Semester-li"
                                    key={semester.id}
                                    onClick={() => {
                                        handleCourseView(semester.id);
                                    }}
                                >
                                    {semester.title}
                                </li>
                            ))}
                        </>
                    )}
                    {semesterList.map((semester: SemesterStructure) => {
                        const cId = semester.id;
                        if (displayId === cId) {
                            return (
                                <div className="popup-container">
                                    <div className="popup">
                                        <SemesterView
                                            semester={semester}
                                            resetView={resetCourseView}
                                        ></SemesterView>
                                    </div>
                                    <div className="background-overlay"></div>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}
                </ul>
            </div>
            {isMakeSemesterCard && (
                <div className="popup-container">
                    <div className="popup">
                        <SemesterCard
                            semesterList={semesterList}
                            setSemesterList={setSemesterList}
                            setIsSemesterCard={setIsMakeSemesterCard}
                            idCounter={idCounter}
                            setIdCounter={setIdCounter}
                        ></SemesterCard>
                        <button onClick={hideMakeSemesterCard}>Close</button>
                    </div>
                    <div className="background-overlay"></div>
                </div>
            )}
        </div>
    );
};
