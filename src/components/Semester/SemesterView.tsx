import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Semester } from "../../interfaces/semester";
import { SemesterAddCourse } from "./SemesterAddCourse";
import { Course } from "../../interfaces/course";

export const SemesterView = ({
    courses,
    resetView,
    semester
}: {
    courses: Course[];
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
        //for next Sprint to accomplish
    }
    function updateDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setDescription(event.target.value);
    }
    function saveInfo() {
        semester.notes = semester.notes + description;
        semester.courses = [...addedCourses];
        const totalCredits = addedCourses.reduce(
            (sum: number, course: Course) => sum + course.credits,
            0
        );
        semester.currentCredits = totalCredits;
        resetView();
    }
    function clearCourses() {
        setAddedCourses([]);
        semester.courses = [];
    }
    return (
        <div>
            <h1>
                {" "}
                {semester.title} ID: {semester.id}
            </h1>
            <h3>Maximum Credits Allowed: {semester.maxCredits} credits</h3>
            <h3>Current Credits: {semester.currentCredits} credits</h3>
            <h3>Courses: </h3>
            {semester.courses.map((c) => (
                <div key={c.id}>{c.id}</div>
            ))}
            <Button onClick={displayCourses}>Add Course</Button>
            <Button onClick={clearCourses}>Clear Courses</Button>
            <Button onClick={resetView}>Exit</Button>
            <Button onClick={saveInfo}>Save</Button>
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
                        onClick={() =>
                            currIndex > 0
                                ? setIndex(currIndex - NUM_COURSES_DISPLAYED)
                                : setIndex(currIndex)
                        }
                    >
                        Back
                    </Button>
                    <Button
                        onClick={() =>
                            currIndex < courses.length - NUM_COURSES_DISPLAYED
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
                    courses={courses.slice(
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
