import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Semester } from "../../interfaces/semester";
import { SemesterAddCourse } from "./SemesterAddCourse";
import { Course } from "../../interfaces/course";

export const SemesterView = ({
    resetView,
    semester
}: {
    resetView: () => void;
    semester: Semester;
}) => {
    const [description, setDescription] = useState<string>("");
    const [addedCourses, setAddedCourses] = useState<Course[]>([]);
    const [credits, setCredits] = useState<number>(0);
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
        for (const x of addedCourses) {
            if (!semester.courses.includes(x)) {
                semester.courses.push(x);
            }
        }
        setCredits(
            addedCourses.reduce((sum: number, course: Course): number => {
                const creds: number = course.credits as number;
                return sum + creds;
            }, 0)
        );
        console.log(credits);
        setAddedCourses([]);
    }
    function clearCourses() {
        setAddedCourses([]);
        semester.courses = [];
    }
    function removeCourse(id: string) {
        semester.courses = semester.courses.filter((c: Course) => c.id != id);
        saveInfo();
    }
    return (
        <div>
            <h1>
                {" "}
                {semester.title} ID: {semester.id}
            </h1>
            <h3>Maximum Credits Allowed: {semester.maxCredits} credits</h3>
            <h3>Current Credits: {credits} credits</h3>
            <h3>Courses: </h3>
            {semester.courses.map((c) => (
                <div key={c.id}>
                    {c.id}{" "}
                    <Button onClick={() => removeCourse(c.id)}>Remove</Button>
                </div>
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
