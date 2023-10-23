import React, { useState } from "react";
import { Degree } from "../interfaces/degree";
import { DegreeCard } from "./DegreeCard";

export const DegreeList = ({ degrees }: { degrees: Degree[] }) => {
    const [displayId, setDisplayId] = useState<null | string>(null);

    const handleCourseView = (id: string) => {
        setDisplayId(id);
    };

    const resetCourseView = () => {
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
                        ></DegreeCard>
                    ))}
                </>
            )}
        </div>
    );
};
