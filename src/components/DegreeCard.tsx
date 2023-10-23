import React from "react";
import { Degree } from "../interfaces/degree";
import { Year } from "../interfaces/year";

import "./DegreeCard.css";

export const DegreeCard = ({ degree }: { degree: Degree }) => {
    return (
        <div className="degree_view_card">
            <div>
                <h3 className="degreeName">{degree.name}</h3>
                <p>{degree.years.map((year: Year): string => year.name)}</p>
            </div>
        </div>
    );
};
