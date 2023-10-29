import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "./Semester.css";
import { SemesterCard } from "./SemesterCard";
import { SemesterView } from "./SemesterView";
import { SemesterStructure } from "../../interfaces/semester";
import { SemesterBackEnd } from "../../interfaces/semesterBackend";

export interface SemesterInterfaceProps {
    semesterList: SemesterStructure[];
    setSemesterList: (list: SemesterStructure[]) => void;
    setIsSemesterCard: (isCard: boolean) => void;
    idCounter: number;
    setIdCounter: (num: number) => void;
}

export const Semester = () => {
    const [myRestData, setMyRestData] = useState<SemesterBackEnd[]>([]);
    const [semesterList, setSemesterList] = useState<SemesterStructure[]>([]);
    const [isMakeSemesterCard, setIsMakeSemesterCard] =
        useState<boolean>(false);
    const [displayId, setDisplayId] = useState<null | number>(null);
    const [idCounter, setIdCounter] = useState<number>(1);

    useEffect(() => {
        fetch("http://localhost:8080/semester/list")
            .then((response) => response.json())
            .then((data) => setMyRestData(data));
    }, []);

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
            {" "}
            <div>
                {myRestData.map((item) => {
                    console.log(item);
                    console.log("HELLO BRO");
                    <ul>
                        <li>
                            {" "}
                            Backend info: {item.year} {item.season}
                        </li>
                    </ul>;
                })}
                Hi:
            </div>
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
