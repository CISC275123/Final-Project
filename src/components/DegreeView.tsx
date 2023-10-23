import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Year } from "../interfaces/year";
import { Degree } from "../interfaces/degree";

import "./DegreeView.css";

export const DegreeView = ({
    degree,
    resetView
}: {
    degree: Degree;
    resetView: () => void;
}) => {
    const [edit, setEdit] = useState(false);

    const switchEdit = () => {
        setEdit(!edit);
    };

    return (
        <div className="degree_card">
            <div>
                {/* <Button
                    className="esc_button text-align-center"
                    variant="warning"
                    onClick={() => {
                        switchEdit();
                    }}
                >
                    Edit
                </Button> */}
                <Button
                    className="esc_button text-align-center"
                    variant="danger"
                    onClick={resetView}
                >
                    {"Exit"}
                </Button>
            </div>

            {!edit && (
                <div className="degree_page">
                    <div className="year_view_columns">
                        {degree.years.map((year: Year): string => year.name)}
                    </div>
                </div>
            )}
        </div>
    );
};
