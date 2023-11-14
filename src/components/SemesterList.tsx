/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Semester/SemesterList.css";
import { Semester } from "../interfaces/semester";
import { SemesterView } from "./SemesterView";
import { SemesterCard } from "./SemesterCard";
import { Degree } from "../interfaces/degree";
import { Year } from "../interfaces/year";
import { Course } from "../interfaces/course";

export const SemesterList = ({
    semesterList,
    setSemesterList,
    degree,
    year,
    defaultCourses
}: {
    semesterList: Semester[];
    setSemesterList: (
        semesterList: Semester[],
        degree: Degree,
        year: Year
    ) => void;
    degree: Degree;
    year: Year;
    defaultCourses: Course[];
}) => {
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
        setSemesterList(newSemesterList, degree, year);
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
                                        onClick={() => {
                                            handleCourseView(semester.id);
                                        }}
                                    >
                                        Edit Semester
                                    </Button>{" "}
                                    <Button
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
                            degree={degree}
                            year={year}
                            defaultCourses={defaultCourses}
                        ></SemesterCard>
                        <button onClick={hideMakeSemesterCard}>Close</button>
                    </div>
                    <div className="background-overlay"></div>
                </div>
            )}
        </div>
    );
};
