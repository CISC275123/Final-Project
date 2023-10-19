import React, { FC, useState } from "react";
import { Button } from "react-bootstrap";

// interface SemesterProps {}
let addedCourses: string[];
export const Semester = () => {
    const [updatedAddedCourses, setUpdatedAddedCourses] =
        useState<string[]>(addedCourses);

    return (
        <div>
            <h1>Semesters</h1>
            <Button>Add Courses</Button>
            <Button>Delete Courses</Button>
        </div>
    );
};

// export const Semester = ({}: {}) => {
//     return <div>Hello</div>;
// };
