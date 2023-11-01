/* eslint-disable indent */
import React, { ReactComponentElement, ReactNode, useState } from "react";
import { Course } from "../interfaces/course";
import { CourseEdit } from "./CourseEdit";
import { Button } from "react-bootstrap";
import { CourseCard } from "./CourseCard";

import "./CourseView.css";
import sample from "../data/courses.json";

const COURSES = sample.map(
    (course): Course => ({
        id: course.id,
        name: course.name,
        credits: course.credits as unknown as number,
        prerequisites: course.prereqs as unknown as string[],
        restrictions: course.restrictions as unknown as string,
        description: course.description,
        corequisites: course.coreqs as unknown as string[]
    })
);

export const CourseView = ({
    course,
    editCourse,
    resetView,
    default_courses,
    handleClick
}: {
    course: Course;
    editCourse: (courseID: string, newCourse: Course) => void;
    resetView: () => void;
    default_courses: Course[];
    handleClick: (id: string) => void;
}) => {
    const [edit, setEdit] = useState(false);

    const switchEdit = () => {
        setEdit(!edit);
    };

    function findMatching(courses: string[]): Course[] {
        const checking = courses.filter((c: string): boolean =>
            c.includes("||")
        );

        if (checking.length > 0) {
            const newCourses = courses.map((c: string) =>
                c.includes("||") ? c.split("||") : c
            );

            const unpackedCourses = newCourses.flat();

            const matching = COURSES.filter(
                (course: Course): boolean =>
                    unpackedCourses.filter((c: string): boolean =>
                        c.includes(course.id.replace(/\s/g, ""))
                    ).length > 0
            );

            return matching;
        } else {
            const matching = COURSES.filter(
                (course: Course): boolean =>
                    courses.filter((c: string): boolean =>
                        c.includes(course.id.replace(/\s/g, ""))
                    ).length > 0
            );
            return matching;
        }
    }

    function findUnknown(courses: string[]): string[] {
        const removeOR: string[] = courses.filter(
            (c: string): boolean => !c.includes("||")
        );

        const unknownCourses: string[] = removeOR.filter(
            (c: string): boolean =>
                COURSES.filter(
                    (course: Course): boolean =>
                        course.id.replace(/\s/g, "") === c
                ).length === 0
        );

        return unknownCourses;
    }

    function showRequirements(preq_courses: string[]): ReactNode | string {
        const reqs: Course[] = findMatching(preq_courses);
        // const coreqs: Course[] = findMatching(coreq_courses);

        const unknownReqs: string[] = findUnknown(preq_courses);
        // const unknownCoreqs: string[] = findUnknown(coreq_courses);

        return (
            <div>
                <h2>{unknownReqs.map((course: string) => course)}</h2>
                <h3 className="reqs_card">
                    {reqs.map((course: Course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            handleClick={handleClick}
                        ></CourseCard>
                    ))}
                </h3>
                {/* <h2>{unknownCoreqs.map((course: string) => course + " ")}</h2>
                {coreqs.length > 0 && (
                    <h3 className="coreq_card">
                        {coreqs.map((course: Course) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                handleClick={handleClick}
                            ></CourseCard>
                        ))}
                    </h3>
                )} */}
            </div>
        );
    }

    return (
        <div className="quiz_card">
            <div>
                <Button
                    className="esc_button text-align-center"
                    variant="warning"
                >
                    Add
                </Button>
                <Button
                    className="esc_button text-align-center"
                    variant="warning"
                    onClick={() => {
                        switchEdit();
                    }}
                >
                    Edit
                </Button>
                <Button
                    className="esc_button text-align-center"
                    variant="danger"
                    onClick={resetView}
                >
                    {"Exit"}
                </Button>
            </div>

            {edit && (
                <CourseEdit
                    course={course}
                    editCourse={editCourse}
                    switchEdit={switchEdit}
                    resetView={resetView}
                    default_courses={default_courses}
                ></CourseEdit>
            )}
            {!edit && (
                <div className="course_view_card">
                    <div>
                        <h3 className="courseID">
                            {course.id} : {course.name}
                        </h3>
                        <p>
                            {course.credits} credit
                            {course.credits !== 1 ? "s" : ""}
                        </p>
                    </div>
                    <p>{course.description}</p>

                    <br />

                    <h2 className="reqs_title">Requirements</h2>
                    <div className="reqs_list">
                        <h3 className="reqs">
                            {course.prerequisites === null
                                ? "No Requirements"
                                : showRequirements([...course.prerequisites])}
                        </h3>
                    </div>
                </div>
            )}
        </div>
    );
};
