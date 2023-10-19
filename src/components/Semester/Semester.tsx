import React, { FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Course } from "../../interfaces/course";

// interface SemesterProps {}
export const Semester = ({
    courses,
    default_courses
}: {
    courses: Course[];
    default_courses: Course[];
}) => {
    const [updatedAddedCourses, setUpdatedAddedCourses] =
        useState<Course[]>(default_courses);
    const [courseToAdd, setCourseToAdd] = useState<string>("HAPPY");

    function updateCourseToAdd(event: React.ChangeEvent<HTMLSelectElement>) {
        setCourseToAdd(event.target.value);
    }

    // function updateSemesterList(event: React.ChangeEvent<HTMLInputElement>) {
    //     const course = event.target.value;
    //     // Check if the emotion is already present
    //     if (updatedAddedCourses.includes(course)) {
    //         // Remove the given value
    //         setUpdatedAddedCourses(
    //             updatedAddedCourses.filter((e) => e !== course)
    //         );
    //     } else {
    //         // Append the given value
    //         setUpdatedAddedCourses([...updatedAddedCourses, course]);
    //     }
    // }

    return (
        <div>
            <h1>Semesters</h1>
            <Button>Add Courses</Button>
            <Button>Delete Courses</Button>
            <Form.Group controlId="listOfCourses">
                <Form.Label>Pick a course to add</Form.Label>
                {default_courses.map((course: Course) => (
                    <Form.Check
                        key={course.id}
                        type="checkbox"
                        id="checkbox-courses"
                        label={course.name}
                        value={course.name}
                        // onChange={updateSemesterList}
                    >
                        <option value={course.name}>{course.name}</option>
                        {/* <option value="sad">Sad</option>
                        <option value="angry">Angry</option> */}
                    </Form.Check>
                ))}
                {/* <Form.Select value={courseToAdd} onChange={updateCourseToAdd}>
                    <option value="happy">Happy</option>
                    <option value="sad">Sad</option>
                    <option value="angry">Angry</option>
                </Form.Select> */}
            </Form.Group>
        </div>
    );
};
