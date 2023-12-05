/* eslint-disable no-extra-parens */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import "./SemesterViewCard.css";
import "./DegreeView.css";
import { CourseView } from "./CourseView";
import { Degree } from "../interfaces/degree";
import { Year } from "../interfaces/year";

export const SemesterViewCard = ({
    semester,
    handleView,
    toggle,
    removeSemester,
    updateGlobalCourseList,
    globalCourseList,
    setSemesterList,
    degree,
    year
}: {
    semester: Semester;
    handleView: (id: number) => void;
    toggle: (id: number) => void;
    removeSemester: (id: number) => void;
    updateGlobalCourseList: (newList: Course[]) => void;
    globalCourseList: Course[];
    setSemesterList: (
        semesterList: Semester[],
        degree: Degree,
        year: Year
    ) => void;
    degree: Degree;
    year: Year;
}) => {
    const [displayId, setDisplayId] = useState<null | number>(null);

    const [defaultCourses, setDefaultCourses] = useState<Course[]>([]);

    const resetCourseView = () => {
        setDisplayId(null);
    };

    useEffect(() => {
        // Save degree plans to local storage
        setDefaultCourses(globalCourseList);
    }, []);

    function editCourse(courseID: number, newCourse: Course) {
        const newList: Course[] = globalCourseList.map(
            (course: Course): Course =>
                course.id === courseID ? newCourse : course
        );
        updateGlobalCourseList(newList);

        const newSemester: Semester = {
            ...semester,
            courses: semester.courses.map(
                (c: Course): Course => (c.id === courseID ? newCourse : c)
            )
        };

        const newSemesterList: Semester[] = year.semesters.map(
            (sem: Semester): Semester =>
                sem.id === semester.id ? newSemester : sem
        );

        setSemesterList(newSemesterList, degree, year);
    }

    function convertCredits(course: Course): number | string {
        const trimCred = course.credits.trim();

        if (trimCred.slice(1, 2) === "-") {
            return trimCred;
        } else {
            const cred: number = parseInt(course.credits.trim().slice(0, 1));
            return cred;
        }
    }
    return (
        <div className="semester_view_card">
            <h3 className="degreeName">{semester.title}</h3>
            <h6 className="credits">
                Current Registered Credits: {semester.currentCredits}
            </h6>
            <Button
                className="sampleDegreeButtons"
                onClick={() => {
                    handleView(semester.id);
                }}
            >
                Edit Semester
            </Button>{" "}
            <Button
                className="sampleDegreeButtons"
                onClick={() => removeSemester(semester.id)}
            >
                Delete Semester
            </Button>{" "}
            <Button
                className="sampleDegreeButtons"
                onClick={() => toggle(semester.id)}
            >
                Show Courses
            </Button>
            <div className="listCourses">
                <ul>
                    {!displayId &&
                        semester.courses.map((course: Course) => (
                            <li
                                key={course.id}
                                onClick={() => setDisplayId(course.id)}
                            >
                                {course.code}: {course.name}
                            </li>
                        ))}
                    {semester.courses.map((course: Course) => {
                        if (course.id === displayId) {
                            return (
                                <CourseView
                                    course={course}
                                    editCourse={editCourse}
                                    resetView={resetCourseView}
                                    default_courses={defaultCourses}
                                    convertCredits={convertCredits}
                                    departments={[]}
                                ></CourseView>
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
