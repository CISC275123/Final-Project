import React from "react";
import { Degree } from "../interfaces/degree";
import { Year } from "../interfaces/year";

import "./DegreeCard.css";

export const DegreeCard = ({
    degree,
    handleClick
}: {
    degree: Degree;
    handleClick: (id: string) => void;
}) => {
    return (
        <div
            className="degree_view_card"
            onClick={() => handleClick(degree.name)}
        >
            <div>
                <h3 className="degreeName">{degree.name}</h3>
            </div>
        </div>
    );
};
