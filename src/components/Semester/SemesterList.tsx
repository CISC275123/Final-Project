import React, { FC, useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Course } from "../../interfaces/course";
import sample from "../../data/courses.json";
import "./SemesterList.css";
import { SemesterCard } from "./SemesterCard";
import { SemesterView } from "./SemesterView";
import { Semester } from "../../interfaces/semester";

export interface SemesterInterfaceProps {
    semesterList: Semester[];
    setSemesterList: (list: Semester[]) => void;
    setIsSemesterCard: (isCard: boolean) => void;
    idCounter: number;
    setIdCounter: (num: number) => void;
}

export const SemesterList = ({ courses }: { courses: Course[] }) => {
    const [semesterList, setSemesterList] = useState<Semester[]>([]);
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

    function deleteSemester(inputID: number) {
        const newSemesterList = semesterList.filter(
            (sem: Semester): boolean => inputID !== sem.id
        );
        setSemesterList(newSemesterList);
        console.log("Delete");
    }

    return (
        <div>
            <Button
                className="AddSemesterButton"
                onClick={showMakeSemesterCard}
            >
                Add Semester
            </Button>
            <div className="List">
                <ul>
                    {!displayId && (
                        <>
                            {semesterList.map((semester: Semester) => (
                                <div
                                    key={semester.id}
                                    className="SemesterContainer"
                                >
                                    <li className="Semester-li">
                                        {semester.title}
                                    </li>
                                    <Button
                                        className="EditCustom"
                                        onClick={() => {
                                            handleCourseView(semester.id);
                                        }}
                                    >
                                        Edit Semester
                                    </Button>{" "}
                                    <Button
                                        className="DeleteCustom"
                                        onClick={() => {
                                            deleteSemester(semester.id);
                                        }}
                                    >
                                        Delete Semester
                                    </Button>
                                </div>
                            ))}
                        </>
                    )}
                    {semesterList.map((semester: Semester) => {
                        const cId = semester.id;
                        if (displayId === cId) {
                            return (
                                <div className="popup-container">
                                    <div className="popup">
                                        <SemesterView
                                            courses={courses}
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
