/* eslint-disable no-extra-parens */
import React, { ReactNode, useState } from "react";
import { Course } from "../interfaces/course";
import { CourseEdit } from "./CourseEdit";
import { Button } from "react-bootstrap";
import { CourseCard } from "./CourseCard";

import "./CourseView.css";

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

    // function findMatching(courses: string[]): Course[] {
    //     const checking = courses.filter((c: string): boolean =>
    //         c.includes("||")
    //     );

    //     if (checking.length > 0) {
    //         const newCourses = courses.map((c: string) =>
    //             c.includes("||") ? c.split("||") : c
    //         );

    //         const unpackedCourses = newCourses.flat();

    //         // Finds the course object that matches all of the listed prerequisites.
    //         const matching = default_courses.filter(
    //             (course: Course): boolean =>
    //                 unpackedCourses.filter((c: string): boolean =>
    //                     c.includes(course.code.replace(/\s/g, ""))
    //                 ).length > 0
    //         );

    //         return matching;
    //     } else {
    //         const matching = default_courses.filter(
    //             (course: Course): boolean =>
    //                 courses.filter((c: string): boolean =>
    //                     c.includes(course.code.replace(/\s/g, ""))
    //                 ).length > 0
    //         );
    //         return matching;
    //     }
    // }

    // function findUnknown(courses: string[]): string[] {
    //     const checking = courses.filter((c: string): boolean =>
    //         c.includes("||")
    //     );

    //     if (checking.length > 0) {
    //         const newCourses = courses.map((c: string) =>
    //             c.includes("||") ? c.split("||") : ""
    //         );

    //         const unpackedCourses = newCourses.flat();

    //         const unknownCourses = unpackedCourses.filter(
    //             (c: string): boolean =>
    //                 default_courses.filter((course: Course): boolean =>
    //                     c.includes(course.code.replace(/\s/g, ""))
    //                 ).length <= 0
    //         );

    //         // // Finds the course object that matches all of the listed prerequisites.
    //         // const unknownCourses = COURSES.filter(
    //         //     (course: Course): boolean =>
    //         //         unpackedCourses.filter(
    //         //             (c: string | null): boolean =>
    //         //                 c !== null &&
    //         //                 c.includes(course.code.replace(/\s/g, ""))
    //         //         ).length < 0
    //         // );

    //         return unknownCourses;
    //     } else {
    //         const unknownCourses = courses.filter(
    //             (c: string): boolean =>
    //                 default_courses.filter((course: Course): boolean =>
    //                     c.includes(course.code.replace(/\s/g, ""))
    //                 ).length <= 0
    //         );
    //         return unknownCourses;
    //     }

    //     // const unknownCourses: string[] = removeOR.filter(
    //     //     (c: string): boolean =>
    //     //         COURSES.filter(
    //     //             (course: Course): boolean =>
    //     //                 course.code.replace(/\s/g, "") === c
    //     //         ).length === 0
    //     // );
    // }

    // function showRequirements(preq_courses: string[]): ReactNode | string {
    //     const reqs: Course[] = findMatching(preq_courses);
    //     // const coreqs: Course[] = findMatching(coreq_courses);

    //     const unknownReqs: string[] = findUnknown(preq_courses);
    //     // const unknownCoreqs: string[] = findUnknown(coreq_courses);

    //     // Finds the course objects that are listed as XXX OR XXX as a requirement.
    //     const checking = preq_courses.filter((c: string): boolean =>
    //         c.includes("||")
    //     );
    //     const orCourses = reqs.filter(
    //         (course: Course): boolean =>
    //             checking.filter((c: string): boolean =>
    //                 c.includes(course.code.replace(/\s/g, ""))
    //             ).length > 0
    //     );

    //     if (orCourses.length > 0) {
    //         // Finds the non-OR classes
    //         const newMatching = reqs.filter(
    //             (course: Course): boolean =>
    //                 orCourses.filter(
    //                     (course2: Course): boolean =>
    //                         course.code === course2.code
    //                 ).length <= 0
    //         );
    //         return (
    //             <div>
    //                 <h2>
    //                     {unknownReqs.map((c: string, index) => (
    //                         <div key={index}>{c}</div>
    //                     ))}
    //                 </h2>
    //                 <h3 className="orReqs_card">
    //                     {orCourses.map((course: Course, index) => (
    //                         <div key={course.code} onClick={resetView}>
    //                             <CourseCard
    //                                 key={course.code}
    //                                 course={course}
    //                                 handleClick={handleClick}
    //                             ></CourseCard>
    //                             {index < orCourses.length - 1 && <p>OR</p>}
    //                         </div>
    //                     ))}
    //                 </h3>
    //                 <h3 className="reqs_card">
    //                     {newMatching.map((course: Course, index) => (
    //                         <div key={index} onClick={resetView}>
    //                             <CourseCard
    //                                 key={course.code}
    //                                 course={course}
    //                                 handleClick={handleClick}
    //                             ></CourseCard>
    //                         </div>
    //                     ))}
    //                 </h3>
    //             </div>
    //         );
    //     }

    //     return (
    //         <div>
    //             <h2>{unknownReqs.map((c: string) => c)}</h2>
    //             <h3 className="reqs_card">
    //                 {reqs.map((course: Course, index) => (
    //                     <div key={index} onClick={resetView}>
    //                         <CourseCard
    //                             key={course.code}
    //                             course={course}
    //                             handleClick={handleClick}
    //                         ></CourseCard>
    //                     </div>
    //                 ))}
    //             </h3>
    //             {/* <h2>{unknownCoreqs.map((course: string) => course + " ")}</h2>
    //             {coreqs.length > 0 && (
    //                 <h3 className="coreq_card">
    //                     {coreqs.map((course: Course) => (
    //                         <CourseCard
    //                             key={course.code}
    //                             course={course}
    //                             handleClick={handleClick}
    //                         ></CourseCard>
    //                     ))}
    //                 </h3>
    //             )} */}
    //         </div>
    //     );
    // }

    return (
        <div className="quiz_card">
            <div>
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
                            {course.credits} credit
                            {(course.credits as unknown as number) !== 1
                                ? "s"
                                : ""}
                        </p>
                    </div>
                    <p>{course.descr}</p>

                    <br />

                    {/* <div className="reqs_list">
                        <h2>Prerequisites</h2>
                        <h5 className="reqs">
                            {course.preReq === null
                                ? "No Requirements"
                                : showRequirements([...course.preReq])}
                        </h5>
                        <h2>Restrictions</h2>
                        <h5 className="restrictions">
                            {course.restrict === null
                                ? "No Restrictions"
                                : course.restrict}
                        </h5>
                    </div> */}
                </div>
            )}
        </div>
    );
};
