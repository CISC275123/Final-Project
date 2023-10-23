import React, { useState } from "react";
import { Degree } from "../interfaces/degree";
import { DegreeCard } from "./DegreeCard";
import { DegreeView } from "./DegreeView";

export const DegreeList = ({ degrees }: { degrees: Degree[] }) => {
    const [displayId, setDisplayId] = useState<null | string>(null);

    const handleDegreeView = (id: string) => {
        setDisplayId(id);
    };

    const resetDegreeView = () => {
        setDisplayId(null);
    };

    return (
        <div className="course_list">
            {!displayId && (
                <>
                    {degrees.map((degree: Degree) => (
                        <DegreeCard
                            key={degree.name}
                            degree={degree}
                            handleClick={handleDegreeView}
                        ></DegreeCard>
                    ))}
                </>
            )}
            {degrees.map((degree: Degree) => {
                const dId = degree.name;
                if (displayId === dId) {
                    return (
                        <DegreeView
                            degree={degree}
                            resetView={resetDegreeView}
                        ></DegreeView>
                    );
                } else {
                    return null;
                }
            })}
        </div>
    );
};
