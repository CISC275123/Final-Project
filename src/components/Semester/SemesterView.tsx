import React, { useState } from "react";
import { Button } from "react-bootstrap";

export const SemesterView = ({
    resetView,
    semesterTitle,
    semesterID
}: {
    semesterTitle: string;
    semesterID: number;
    resetView: () => void;
}) => {
    return (
        <div>
            {semesterTitle} &:{semesterID}
            <Button onClick={resetView}>Exit</Button>
        </div>
    );
};
