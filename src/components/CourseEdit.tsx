import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Course } from "../interfaces/course";

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

    const editCredits = (course: Course, newCredits: number) => {
        const newCourse = { ...course, credits: newCredits };
        setNewCourse(newCourse);
    };

    const saveChanges = () => {
        editCourse(course.id.replace(/\s/g, ""), newCourse);
    };

    return (
        <div>
            <div>
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
