import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import "./Semester.css";
import { SemesterCard } from "./SemesterCard";
import { SemesterView } from "./SemesterView";
import { SemesterStructure } from "../../interfaces/semester";
import { RegistrationCard } from "../../interfaces/registrationCard";
import { CourseBackend } from "../../interfaces/courseBackend";
import ReadMoreReact from "read-more-react";

export interface SemesterInterfaceProps {
    semesterList: SemesterStructure[];
    setSemesterList: (list: SemesterStructure[]) => void;
    setIsSemesterCard: (isCard: boolean) => void;
    idCounter: number;
    setIdCounter: (num: number) => void;
}

export const Semester = () => {
    const [myRestData, setMyRestData] = useState<RegistrationCard[]>([]);
    const [semesterList, setSemesterList] = useState<SemesterStructure[]>([]);
    const [isMakeSemesterCard, setIsMakeSemesterCard] =
        useState<boolean>(false);
    const [displayId, setDisplayId] = useState<null | number>(null);
    const [idCounter, setIdCounter] = useState<number>(1);

    useEffect(() => {
        fetch("http://localhost:8080/registration/card", {
            method: "GET",
            headers: {
                studentId: "jasonc"
            }
        })
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

    function deleteSemester(semester: SemesterStructure) {
        const newSemester = semesterList.filter(
            (sem: SemesterStructure): boolean => semester.id != sem.id
        );
        setSemesterList(newSemester);
        console.log("Delete");
    }

    const dropCourse = (
        registrationCard: RegistrationCard,
        course: CourseBackend
    ) => {
        console.log(
            "Delete " + course.id + " semester " + registrationCard.semester.id
        );
        const options = {
            method: "DELETE",
            url: "http://localhost:8080/registration/delete",
            headers: {
                studentId: "jasonc",
                semesterId: registrationCard.semester.id,
                courseId: course.id
            }
        };

        axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                alert("Course " + course.id + " dropped");
            })
            .catch(function (error) {
                console.error(error);
                alert("Error in dropping " + course.id + " - " + error);
            });
    };

    return (
        <div>
            {" "}
            <div>
                <h4>Course Registration Dashboard</h4>
                <ol>
                    {myRestData.map((item) => {
                        return (
                            <li className="Semester-li" key={item.semester.id}>
                                {item.semester.year} {item.semester.season},
                                total credits: {item.totalCredit} (max{" "}
                                {item.semester.maxCredit} allowed for this
                                semester)
                                <ul>
                                    {item.courseSelected.map(
                                        (course: CourseBackend) => {
                                            return (
                                                <li
                                                    key={
                                                        item.semester.id +
                                                        course.id
                                                    }
                                                >
                                                    {course.id} -{" "}
                                                    {course.courseName} (
                                                    {course.credit} credits){" "}
                                                    <button
                                                        className="btn btn-delete"
                                                        onClick={() =>
                                                            dropCourse(
                                                                item,
                                                                course
                                                            )
                                                        }
                                                    >
                                                        Drop
                                                    </button>
                                                    <ReadMoreReact
                                                        text={
                                                            course.courseDescription
                                                        }
                                                        min={100}
                                                        ideal={250}
                                                        max={300}
                                                        readMoreText="...<read more>"
                                                    />
                                                </li>
                                            );
                                        }
                                    )}
                                </ul>
                            </li>
                        );
                    })}
                </ol>
            </div>
            <Button onClick={showMakeSemesterCard}>Add Semester</Button>
            <div className="List">
                <ul>
                    {!displayId && (
                        <>
                            {" "}
                            {semesterList.map((semester: SemesterStructure) => {
                                <>
                                    <li
                                        className="Semester-li"
                                        key={semester.id}
                                        onClick={() => {
                                            handleCourseView(semester.id);
                                        }}
                                    >
                                        {semester.title}
                                    </li>
                                    <div>
                                        <Button
                                            onClick={() => {
                                                deleteSemester(semester);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </>;
                            })}
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
