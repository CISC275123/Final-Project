import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Course } from "../interfaces/course";

import "./CourseEdit.css";

export const CourseEdit = ({
    course,
    editCourse,
    switchEdit,
    default_courses
}: {
    course: Course;
    editCourse: (courseID: number, newCourse: Course) => void;
    switchEdit: () => void;
    default_courses: Course[];
}) => {
    const [newName, setName] = useState<string>(course.name);
    const [newCredits, setCredits] = useState<string>(course.credits);
    const [newDesc, setDesc] = useState<string>(course.descr);
    const [newCode, setCode] = useState<string>(course.code);

    const cId = course.id;

    // Saves the changes step-by-step by creating new courses, each course containing the desired change.
    // TO DO : Reduce code so that it accomplishes this without creating multiple new instances of a course.
    // BUG : Editing a course after scrolling several pages and saving leads the user to a blank screen.
    // -----> ONLY HAPPENS WHEN FILTER IS SET AND EDITING.
    const saveChanges = () => {
        const newCourseCode: Course = {
            ...course,
            code: newCode
        };

        const newCourseName: Course = {
            ...newCourseCode,
            name: newName
        };

        const newCourseCredits: Course = {
            ...newCourseName,
            credits: newCredits
        };

        const newCourseDesc: Course = {
            ...newCourseCredits,
            descr: newDesc
        };

        const newCourse: Course = {
            ...newCourseDesc
        };

        editCourse(cId, newCourse);
    };

    const resetDefault = () => {
        const defaultCourse = default_courses.filter(
            (course: Course): boolean => course.id === cId
        )[0];

        editCourse(cId, defaultCourse);
    };

    return (
        <div>
            <div>
                <>
                    <hr />
                    <div className="edit_course">
                        <div className="edit_code_row">
                            <div className="edit_code_box">
                                <h4>Course Code:</h4>
                                <Form.Group
                                    className="code_input"
                                    controlId="editCodeFormId"
                                >
                                    <Form.Control
                                        value={newCode}
                                        onChange={(e) =>
                                            setCode(e.target.value)
                                        }
                                    ></Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="edit_name_row">
                            <div className="edit_name_box">
                                <h4>Course Name:</h4>
                                <Form.Group
                                    className="name_input"
                                    controlId="editNameFormId"
                                >
                                    <Form.Control
                                        value={newName}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    ></Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="edit_credits_row">
                            <div className="edit_credits_box">
                                <h4>Credits</h4>
                                <Form.Group
                                    className="credits_input"
                                    controlId="editCreditsFormId"
                                >
                                    <Form.Control
                                        value={newCredits}
                                        type="string"
                                        onChange={(e) =>
                                            setCredits(e.target.value)
                                        }
                                    ></Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="edit_desc_row">
                            <div className="edit_desc_box">
                                <h4>Description:</h4>
                                <Form.Group
                                    className="desc_input"
                                    controlId="editDescFormId"
                                >
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={newDesc}
                                        onChange={(e) =>
                                            setDesc(e.target.value)
                                        }
                                    ></Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                </>
                <div className="edit_footer">
                    <div>
                        <Button
                            variant="success"
                            className="save_edit_btn"
                            onClick={() => {
                                saveChanges();
                                switchEdit();
                            }}
                        >
                            Save
                        </Button>
                        <Button variant="warning" onClick={switchEdit}>
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => {
                                resetDefault();
                                switchEdit();
                            }}
                        >
                            Reset
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
