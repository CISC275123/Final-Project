import React from "react";
import { Button } from "react-bootstrap";
import { Degree } from "../interfaces/degree";

import "./DegreeCard.css";

export const DegreeCard = ({
    degree,
    handleClick,
    removeDegree
}: {
    degree: Degree;
    handleClick: (id: number) => void;
    removeDegree: (id: number) => void;
}) => {
    return (
        <div className="degree_view_card">
            <div onClick={() => handleClick(degree.id)}>
                <h3 className="degreeName">{degree.name}</h3>
            </div>
            <Button className="remove" onClick={() => removeDegree(degree.id)}>
                Remove
            </Button>
        </div>
    );
};
