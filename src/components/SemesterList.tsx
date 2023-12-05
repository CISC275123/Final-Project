/* eslint-disable no-extra-parens */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./Semester/SemesterList.css";
import { Semester } from "../interfaces/semester";
import { SemesterView } from "./SemesterView";
import { SemesterCard } from "./SemesterCard";
import { Degree } from "../interfaces/degree";
import { Year } from "../interfaces/year";
import { SemesterViewCard } from "./SemesterViewCard";
import { Course } from "../interfaces/course";

export const SemesterList = ({
    isDataSaved,
    semesterList,
    setSemesterList,
    degree,
    year,
    updateGlobalCourseList,
    globalCourseList
}: {
    isDataSaved: boolean;
    semesterList: Semester[];
    setSemesterList: (
        semesterList: Semester[],
        degree: Degree,
        year: Year
    ) => void;
    degree: Degree;
    year: Year;
    updateGlobalCourseList: (newList: Course[]) => void;
    globalCourseList: Course[];
}) => {
    const [isMakeSemesterCard, setIsMakeSemesterCard] =
        useState<boolean>(false);
    const [displayId, setDisplayId] = useState<null | number>(null);
    const [idCounter, setIdCounter] = useState<number>(1);

    useEffect(() => {
        if (isDataSaved) {
            if (semesterList.length > 1) {
                setIdCounter(semesterList[semesterList.length - 1].id + 1);
            } else if (semesterList.length === 1) {
                setIdCounter(semesterList[0].id + 1);
            } else {
                setIdCounter(1);
            }
        } else {
            setIdCounter(1);
        }
    }, []);

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
        const newSemesterList: Semester[] = semesterList.filter(
            (sem: Semester): boolean => inputID !== sem.id
        );
        setSemesterList(newSemesterList, degree, year);
        console.log("Delete");
    }

    function toggle(id: number) {
        const div = document.getElementById(id.toString());
        if (div) {
            div.style.display = div.style.display == "none" ? "block" : "none";
        }
    }

    return (
        <div>
            <Button
                className="AddSemesterButton"
                onClick={showMakeSemesterCard}
            >
                Add Semester
            </Button>
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
                        ></SemesterCard>
                        <button onClick={hideMakeSemesterCard}>Close</button>
                    </div>
                    <div className="background-overlay"></div>
                </div>
            )}
            <div className="List">
                <ul>
                    {!displayId && (
                        <>
                            {semesterList.map((semester: Semester) => (
                                <div
                                    key={semester.id}
                                    className="SemesterContainer"
                                >
                                    <SemesterViewCard
                                        semester={semester}
                                        handleView={handleCourseView}
                                        toggle={toggle}
                                        removeSemester={deleteSemester}
                                        updateGlobalCourseList={
                                            updateGlobalCourseList
                                        }
                                        globalCourseList={globalCourseList}
                                        setSemesterList={setSemesterList}
                                        degree={degree}
                                        year={year}
                                    />
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
                                            setSemesterList={setSemesterList}
                                            targetDegree={degree}
                                            targetYear={year}
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
        </div>
    );
};
