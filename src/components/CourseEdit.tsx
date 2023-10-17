import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Course } from "../interfaces/course";

import "./CourseEdit.css";

export const CourseEdit = ({
    course,
    editCourse,
    switchEdit,
    resetView
}: {
    course: Course;
    editCourse: (courseID: string, newCourse: Course) => void;
    switchEdit: () => void;
    resetView: () => void;
}) => {
    const [newCourse, setNewCourse] = useState<Course>(course);
    const [newName, setName] = useState<string>(course.name);
    const [newCredits, setCredits] = useState<number>(course.credits);
    const [newDesc, setDesc] = useState<string>(course.description);

    const cId = course.id.replace(/\s/g, "");

    const saveChanges = () => {
        const newCourseName: Course = {
            ...course,
            name: newName
        };

        const newCourseCredits: Course = {
            ...newCourseName,
            credits: newCredits
        };

        const newCourseDesc: Course = {
            ...newCourseCredits,
            description: newDesc
        };

        const newCourse: Course = {
            ...newCourseDesc
        };

        editCourse(cId, newCourse);
    };

    return (
        <div>
            <div>
                <>
                    <hr />
                    <div className="edit_course">
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
                                <h4>
                                    Credit{course.credits !== 1 ? "s:" : ":"}
                                </h4>
                                <Form.Group
                                    className="credits_input"
                                    controlId="editCreditsFormId"
                                >
                                    <Form.Control
                                        value={newCredits}
                                        type="string"
                                        onChange={(e) =>
                                            setCredits(parseInt(e.target.value))
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
                    </div>
                </div>
            </div>
        </div>
    );
};
