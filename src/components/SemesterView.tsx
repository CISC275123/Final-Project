/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { SemesterAddCourse } from "./Semester/SemesterAddCourse";
import { Course } from "../interfaces/course";
import "./SemesterView.css";
import "./Semester/SemesterList.css";
export const SemesterView = ({
    resetView,
    semester
}: {
    resetView: () => void;
    semester: Semester;
}) => {
    const [description, setDescription] = useState<string>("");
    const [addedCourses, setAddedCourses] = useState<Course[]>([]);
    const [isAddCourses, setIsAddCourses] = useState<boolean>(false);
    const [currIndex, setIndex] = useState<number>(0);
    const NUM_COURSES_DISPLAYED = 5;

    function displayCourses() {
        setIsAddCourses(!isAddCourses);
    }
    function updateDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setDescription(event.target.value);
    }
    function saveInfo() {
        semester.notes = semester.notes + description;
        for (const x of addedCourses) {
            if (semester.currentCredits + x.credits <= semester.maxCredits) {
                if (!semester.courses.includes(x)) {
                    semester.courses.push(x);
                    semester.currentCredits =
                        semester.currentCredits + x.credits;
                }
            }
        }
        setAddedCourses([]);
    }
    function clearCourses() {
        setAddedCourses([]);
        semester.courses = [];
        semester.currentCredits = 0;
    }
    function removeCourse(id: string, creds: number) {
        semester.courses = semester.courses.filter((c: Course) => c.id != id);
        semester.currentCredits = semester.currentCredits - creds;
        saveInfo();
    }
    return (
        <div className="SemesterviewContainer">
            <h1>
                {" "}
                {semester.title} ID: {semester.id}
            </h1>
            <h3>Maximum Credits Allowed: {semester.maxCredits} credits</h3>
            <h3>Current Credits: {semester.currentCredits} credits</h3>
            <h3>Courses: </h3>
            {semester.courses.map((c) => (
                <div key={c.id}>
                    {c.id}{" "}
                    <Button onClick={() => removeCourse(c.id, c.credits)}>
                        Remove
                    </Button>
                </div>
            ))}
            <Button className="myCustom" onClick={displayCourses}>
                Show Courses
            </Button>
            <Button className="myCustom2" onClick={clearCourses}>
                Clear Courses
            </Button>
            <Button className="myCustom3" onClick={resetView}>
                Exit
            </Button>
            <Button className="myCustom4" onClick={saveInfo}>
                Save
            </Button>
            <h2>{semester.notes}</h2>
            {!isAddCourses && (
                <Form.Group controlId="formNotes">
                    <Form.Label>Notes:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={updateDescription}
                    />
                </Form.Group>
            )}
            {isAddCourses && (
                <div className="CourseButtons">
                    <Button
                        className="backCourse"
                        onClick={() =>
                            currIndex > 0
                                ? setIndex(currIndex - NUM_COURSES_DISPLAYED)
                                : setIndex(currIndex)
                        }
                    >
                        Back
                    </Button>
                    <Button
                        className="next"
                        onClick={() =>
                            currIndex <
                            semester.courseList.length - NUM_COURSES_DISPLAYED
                                ? setIndex(currIndex + NUM_COURSES_DISPLAYED)
                                : setIndex(currIndex)
                        }
                    >
                        Next
                    </Button>
                </div>
            )}
            {isAddCourses && (
                <SemesterAddCourse
                    courses={semester.courseList.slice(
                        currIndex,
                        currIndex + NUM_COURSES_DISPLAYED
                    )}
                    addedCourses={addedCourses}
                    setAddedCourses={setAddedCourses}
                ></SemesterAddCourse>
            )}
        </div>
    );
};
