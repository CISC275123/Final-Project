/* eslint-disable no-extra-parens */
import React, { ReactNode, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Year } from "../interfaces/year";
import { Degree } from "../interfaces/degree";

import "./DegreeView.css";
import { SemesterList } from "./SemesterList";

import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";

import catalog from "../data/catalog.json";

export const DegreeView = ({
    isDataSaved,
    degree,
    resetView,
    addYear,
    deleteYear,
    updateSemesterList,
    updateGlobalCourseList,
    globalCourseList
}: {
    isDataSaved: boolean;
    degree: Degree;
    resetView: () => void;
    addYear: (name: string, degree: Degree) => void;
    deleteYear: (targetYear: Year, targetDegree: Degree) => void;
    updateSemesterList: (
        newSemesterList: Semester[],
        targetDegree: Degree,
        targetYear: Year
    ) => void;
    updateGlobalCourseList: (newList: Course[]) => void;
    globalCourseList: Course[];
}) => {
    const [isAdding, setAdding] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<string>("Freshman");
    const [showReqs, setShowReqs] = useState<boolean>(false);
    const [baseCourses, setBaseCourses] = useState<Course[]>([]);

    useEffect(() => {
        interface JSONCourse {
            code: string;
            name: string;
            descr: string;
            credits: string;
            preReq: string;
            restrict: string;
            breadth: string;
            typ: string;
        }

        // Creates default list of courses pulling from a JSON file.
        let counter = 1;
        const updatedCourseData: {
            [dept: string]: { [courseCode: string]: Course };
        } = {};

        const updateData: {
            [department: string]: { [courseCode: string]: JSONCourse };
        } = catalog;

        for (const dept in updateData) {
            updatedCourseData[dept] = {};
            const courses = updateData[dept];
            for (const courseCode in courses) {
                const course = courses[courseCode];
                const courseWithId: Course = {
                    ...course,
                    id: counter
                };
                updatedCourseData[dept][courseCode] = courseWithId;
                counter++;
            }
        }
        // Store the course list with IDs in the component's state
        const COURSES: Course[] = Object.values(updatedCourseData)
            .map(Object.values)
            .flat();

        setBaseCourses(COURSES);
    }, []);

    function updateSelection(event: React.ChangeEvent<HTMLSelectElement>) {
        setUserInput(event.target.value);
    }

    // Gets all the courses the user is taking in the entire degree
    function getAllCourses(): Course[] {
        const allCourses: Course[] = degree.years.flatMap((year) =>
            year.semesters.flatMap((semester) => semester.courses)
        );

        return allCourses;
    }

    // Given a list of courses that the student is required to take, finds any course in the students degree plan that fulfills the requirement.
    function getMatchingReqs(requiredCourses: string[]): string[] {
        const matchingCourses = requiredCourses.filter(
            (code: string) =>
                getAllCourses().filter(
                    (course: Course): boolean =>
                        course.code.replace(/\s/g, "") === code
                ).length > 0
        );

        return matchingCourses;
    }

    // Displays all university requirements.
    function displayUnivReqs(): ReactNode {
        const reqs = Object.keys(degree.plan.university);
        const coursesMeetingReqs = Object.values(degree.plan.university);

        return (
            <div>
                {reqs.map((c, index) =>
                    getReqs(reqs, coursesMeetingReqs, index)
                )}
            </div>
        );
    }

    function displayCollegeReqs(): ReactNode {
        const reqs = Object.keys(degree.plan.college);
        const coursesMeetingReqs = Object.values(degree.plan.college);

        // const allCourses = getAllCourses();

        // const removeDups: string[][] = coursesMeetingReqs.map((c: string[]) =>
        //     c.map((item: string) =>
        //         allCourses.map(
        //             (course: Course) => course.code.replace(/\s/g, "") === item
        //         )
        //             ? ""
        //             : item
        //     )
        // );

        return (
            <div>
                {reqs.map((c, index) =>
                    getReqs(reqs, coursesMeetingReqs, index)
                )}
            </div>
        );
    }

    function displayMajorReqs(): ReactNode {
        const reqs = Object.keys(degree.plan.major);
        const coursesMeetingReqs = Object.values(degree.plan.major);
        return (
            <div>
                {reqs.map((c, index) =>
                    getReqs(reqs, coursesMeetingReqs, index)
                )}
            </div>
        );
    }

    // Given the requirement types, courses that fulfill those types, and an index for the type, returns HTML that states
    // whether the student fulfilled the requirement or not. If the student does, it will also list the courses that
    // fulfill that requirement
    function getReqs(
        reqs: string[],
        coursesMeetingReqs: string[][],
        index: number
    ) {
        const check = reqs[index].split("-", 2);

        const matchingCourses = getMatchingReqs(coursesMeetingReqs[index]);

        const totalCredits: number = matchingCourses.reduce(
            (totalCount: number, curr: string) =>
                totalCount +
                parseInt(
                    baseCourses.filter(
                        (course: Course): boolean =>
                            course.code.replace(/\s/g, "") === curr
                    )[0].credits
                ),
            0
        );

        return (
            <div>
                {totalCredits >= parseInt(check[1]) ? (
                    <div>
                        <p>
                            {totalCredits}/{check[check.length - 1]} credits -
                            You have met the {check.slice(0, check.length - 1)}{" "}
                            Requirement
                        </p>
                        <p className="matchingCourses">Courses matching:</p>
                        {matchingCourses.map((c) => {
                            return (
                                <p className="matchingCourses" key={c}>
                                    {c}
                                </p>
                            );
                        })}
                    </div>
                ) : (
                    <div>
                        <p>
                            {totalCredits}/{check[check.length - 1]} credits -
                            You have NOT met the{" "}
                            {check.slice(0, check.length - 1)} Requirement.
                        </p>
                        {matchingCourses.length > 0 && (
                            <p className="matchingCourses">Courses matching:</p>
                        )}
                        {matchingCourses.length > 0 &&
                            matchingCourses.map((c) => {
                                return (
                                    <p className="matchingCourses" key={c}>
                                        {c}
                                    </p>
                                );
                            })}
                    </div>
                )}
            </div>
        );
    }

    // CS BA is MISSING 15 credits in computer science technical electives numbered 301 or above, except for CISC 355, CISC 356, CISC 357, CISC 366, CISC 465, and CISC 466
    // AND Foreign language!

    // CS BS is MISSING 6 credits in Six additional credits of computer science technical electives numbered 301 or above, except for CISC 355, CISC 356, CISC 357, CISC 465, CISC 366 and CISC 466
    // AND 12 credits in advanced courses in a focus area approved by the student’s CISC advisor and the CISC Undergraduate Coordinator

    // A SINGLE COURSE WILL COUNT FOR ALL SIMILAR CATEGORIES. FOR EXAMPLE, A MATH BREADTH COURSE WILL COUNT FOR ALL MATH BREADTH CATEGORIES EVEN WHEN
    // DEGREE STATES IT REQUIRES XX CREDITS IN ADDITION TO BREADTH ALREADY TAKEN.

    return (
        <div className="degree_card">
            <div className="degButtons">
                <Button
                    className="esc_button text-align-center"
                    variant="danger"
                    onClick={resetView}
                >
                    Exit
                </Button>

                <Button
                    style={{
                        background: "#4fc3dc",
                        color: "white"
                    }}
                    className="AddYear"
                    onClick={() => {
                        setAdding(!isAdding);
                    }}
                >
                    Add Year
                </Button>
            </div>
            {isAdding && (
                <Form.Group controlId="formAddDegree" className="formAddDegree">
                    <br />
                    <Form.Label>Name your new Year:</Form.Label>
                    <Form.Select onChange={updateSelection} value={userInput}>
                        <option value="Freshman">Freshman</option>
                        <option value="Sophomore">Sophomore</option>
                        <option value="Junior">Junior</option>
                        <option value="Senior">Senior</option>
                    </Form.Select>
                    <Button
                        variant="success"
                        className="save_edit_btn"
                        onClick={() => {
                            addYear(userInput, degree);
                            setAdding(!isAdding);
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        variant="warning"
                        onClick={() => setAdding(!isAdding)}
                    >
                        Cancel
                    </Button>
                </Form.Group>
            )}

            <h2>{degree.name}</h2>
            <h2>{degree.plan.name}</h2>
            <Button
                style={{
                    background: "#4fc3dc",
                    color: "white"
                }}
                className="SDR"
                onClick={() => setShowReqs(!showReqs)}
            >
                {showReqs
                    ? "Close to refresh requirement check"
                    : "Run Requirement Check"}
            </Button>
            {showReqs && (
                <div className="degReqs">
                    <div className="univReqs">
                        <h2>University Requirements</h2>
                        {displayUnivReqs()}
                    </div>
                    <div className="collegeReqs">
                        <h2>College Requirements</h2>
                        {displayCollegeReqs()}
                    </div>
                    <div className="majorReqs">
                        <h2>Major Requirements</h2>
                        {displayMajorReqs()}
                    </div>
                </div>
            )}
            <div className="year_view_rows">
                {degree.years.map((year: Year) => (
                    <div className="year_view_column" key={year.name}>
                        <div className="fixZ">
                            <h4 onClick={() => console.log(year.id)}>
                                {year.name}
                            </h4>
                            <Button
                                className="sampleDegreeButtons"
                                onClick={() => deleteYear(year, degree)}
                            >
                                Delete Year
                            </Button>
                            <Button
                                style={{
                                    background: "#4fc3dc",
                                    color: "white"
                                }}
                                className="sampleDegreeButtons"
                                onClick={() =>
                                    updateSemesterList([], degree, year)
                                }
                            >
                                Clear Semesters
                            </Button>
                            {
                                <div>
                                    <SemesterList
                                        isDataSaved={isDataSaved}
                                        key={year.name}
                                        semesterList={year.semesters}
                                        setSemesterList={updateSemesterList}
                                        degree={degree}
                                        year={year}
                                        updateGlobalCourseList={
                                            updateGlobalCourseList
                                        }
                                        globalCourseList={globalCourseList}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
