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
import { SemesterViewCard } from "./SemesterViewCard";
import { StringLiteral } from "typescript";

export const SemesterList = ({
    isDataSaved,
    semesterList,
    setSemesterList,
    degree,
    year
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
                                    />
                                    {/*<li className="Semester-li">
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
                                    <div>
                                        <ul>
                                            {semester.courses.map(
                                                (course: Course) => (
                                                    <li key={course.id}>
                                                        {course.code}:{" "}
                                                        {course.name}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                                </div>*/}
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
                        ></SemesterCard>
                        <button onClick={hideMakeSemesterCard}>Close</button>
                    </div>
                    <div className="background-overlay"></div>
                </div>
            )}
        </div>
    );
};
