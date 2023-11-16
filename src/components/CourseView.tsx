/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { Course } from "../interfaces/course";
import { CourseEdit } from "./CourseEdit";
import { Button } from "react-bootstrap";

import "./CourseView.css";
import { CourseCard } from "./CourseCard";

// TO DO :
// BUG : When prerequisites are "", the display is blank instead of stating "No Prerequisites"
// BUG : When editing a course in "Filter" mode, returning via "save" or "exit" brings the user to a blank screen.
// BUG : Sometimes fails to render any prereqs and, instead, gives blank screen of death

export const CourseView = ({
    course,
    editCourse,
    resetView,
    default_courses,
    convertCredits,
    departments
}: {
    course: Course;
    editCourse: (courseID: number, newCourse: Course) => void;
    resetView: () => void;
    default_courses: Course[];
    convertCredits: (course: Course) => number | string;
    departments: string[];
}) => {
    const [edit, setEdit] = useState(false);

    const switchEdit = () => {
        setEdit(!edit);
    };

    function listOrCourses(courses: Course[]) {
        return courses.map((course: Course, index) => (
            <div key={course.id}>
                <CourseCard
                    handleClick={() => null}
                    course={course}
                    convertCredits={convertCredits}
                ></CourseCard>
                {index < courses.length - 1 ? "OR" : ""}
            </div>
        ));
    }

    function listAndCourses(courses: Course[]) {
        return courses.map((course: Course, index) => (
            <div key={course.id}>
                <CourseCard
                    handleClick={() => null}
                    course={course}
                    convertCredits={convertCredits}
                ></CourseCard>
                {index < courses.length ? "AND" : ""}
            </div>
        ));
    }

    function findPreReqs(str: string) {
        if (
            str.indexOf("or") === -1 ||
            str.indexOf("(or") > 0 ||
            str.indexOf("or)") > 0
        ) {
            const indxOfPreReqs: number[][] = departments.map((dept) =>
                Array.from(str.matchAll(new RegExp(dept, "gi"))).map(
                    (item) => item.index || 0
                )
            );

            const flattenIndx: number[] = indxOfPreReqs
                .flat()
                .filter((item): boolean => item !== -1);

            const strPrereqs: string[] = flattenIndx.map((indx) =>
                str.slice(indx, indx + 8)
            );

            const prereqCourses: Course[] = strPrereqs.map((prereq) =>
                findCourse(prereq)
            );

            if (prereqCourses.length <= 0) {
                return course.preReq;
            } else {
                return displayPreReqs(prereqCourses);
            }
        } else if (str.indexOf(" or ") !== -1) {
            // Finds courses separated by OR
            const indxOfPreReqs: number[] = Array.from(
                str.matchAll(new RegExp(" or ", "gi"))
            ).map((item) => item.index || 0);

            const leftCourses: string[] = indxOfPreReqs.map((indx) =>
                str.slice(indx - 8, indx)
            );
            const rightCourses: string[] = indxOfPreReqs.map((indx) =>
                str.slice(indx + 4, indx + 12)
            );

            const mergeCourses = leftCourses.concat(
                rightCourses.filter((course) => leftCourses.indexOf(course) < 0)
            );

            const prereqCourses: Course[] = mergeCourses
                .map((prereq) => findCourse(prereq))
                .filter((c: Course): boolean => c !== undefined);

            // Finds courses separated by AND
            const indxOfAnd: number[] = Array.from(
                str.matchAll(new RegExp(" and ", "gi"))
            ).map((item) => item.index || 0);

            if (indxOfAnd.length > 0) {
                const leftAndCourse: string[] = indxOfAnd.map((indx) =>
                    str.slice(indx - 8, indx)
                );
                const rightAndCourses: string[] = indxOfAnd.map((indx) =>
                    str.slice(indx + 4, indx + 13)
                );
                const mergeAndCourses = leftAndCourse.concat(
                    rightAndCourses.filter(
                        (course) => leftAndCourse.indexOf(course) < 0
                    )
                );

                const prereqAndCourses: Course[] = mergeAndCourses
                    .map((prereq) => findCourse(prereq))
                    .filter((c: Course): boolean => c !== undefined);

                return (
                    <div>
                        {listAndCourses(prereqAndCourses)}
                        {listOrCourses(prereqCourses)}
                    </div>
                );
            } else if (prereqCourses.length <= 0) {
                return course.preReq;
            } else {
                return listOrCourses(prereqCourses);
            }
        } else if (str !== "") {
            return course.preReq;
        } else {
            return "No Prerequisites";
        }
    }

    function findCourse(strCourse: string): Course {
        const foundCourse: Course[] = default_courses.filter(
            (course: Course): boolean => course.code === strCourse
        );

        return foundCourse[0];
    }

    function displayPreReqs(courses: Course[]) {
        return courses.map((course: Course, index) => (
            <CourseCard
                key={index}
                handleClick={() => null}
                course={course}
                convertCredits={convertCredits}
            ></CourseCard>
        ));
    }

    return (
        <div className="quiz_card">
            <div>
                <Button
                    className="esc_button text-align-center"
                    variant="danger"
                    onClick={resetView}
                >
                    {"Exit"}
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
            </div>

            {edit && (
                <CourseEdit
                    course={course}
                    editCourse={editCourse}
                    switchEdit={switchEdit}
                    default_courses={default_courses}
                ></CourseEdit>
            )}
            {!edit && (
                <div className="course_view_card">
                    <div>
                        <h3 className="courseID">
                            {course.code} : {course.name}
                        </h3>
                        <p>
                            {convertCredits(course)} credit
                            {convertCredits(course) !== 1 ? "s" : ""}
                        </p>
                    </div>
                    <p>{course.descr}</p>

                    <br />

                    <div className="reqs_list">
                        <h2>Prerequisites</h2>
                        <h5 className="reqs">{findPreReqs(course.preReq)}</h5>
                        <h2>Restrictions</h2>
                        <h5 className="restrictions">
                            {course.restrict === ""
                                ? "No Restrictions"
                                : course.restrict}
                        </h5>
                    </div>
                </div>
            )}
        </div>
    );
};
