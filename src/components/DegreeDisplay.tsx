import React, { useState } from "react";
import { Degree } from "../interfaces/degree";
import { DegreeList } from "./DegreeList";
import { Semester } from "../interfaces/semester";
import { Year } from "../interfaces/year";

export const DegreeDisplay = ({
    updateGlobalDegreeList,
    globalDegreeList,
    startingDegreeId
}: {
    updateGlobalDegreeList: (newList: Degree[]) => void;
    globalDegreeList: Degree[];
    startingDegreeId: number;
}) => {
    // IDs used to differentiate instances of objects
    const [degreeId, setDegreeId] = useState<number>(startingDegreeId);
    const [yearId, setYearId] = useState<number>(1);

    // Used to add a new degree plan. Takes user input for the name of the degree plan.
    //
    // INPUTS:
    // name: string => user input, a unique name given by the user so that they can easily remember it.
    //
    // OUTPUTS:
    // Modifies the state variable containing the list of Degrees. Adds the new degree to it.
    function addDegree(name: string, degrees: Degree[] = []): void {
        if (degrees.length <= 0) {
            const newDegree: Degree = {
                name: name,
                years: [],
                id: degreeId
            };
            const newId = degreeId + 1;
            setDegreeId(newId);
            updateGlobalDegreeList([...globalDegreeList, newDegree]);
        } else {
            // Updates IDs in the imported degrees so there is no overlap.
            const updateId: Degree[] = degrees.map(
                (d: Degree, index): Degree => {
                    const newId = degreeId + index;
                    setDegreeId(newId + 1);
                    return {
                        ...d,
                        id: newId
                    };
                }
            );
            updateGlobalDegreeList([...globalDegreeList, ...updateId]);
        }
    }

    // Used to add a new instance of a Year to a degree. Takes user Input for the name.
    // Typically we want the name to be "Year [1-4]" or "Freshman", "Sophomore", etc ...
    //
    // INPUTS:
    // name: string => user input, a unique name given by the user so that they can easily remember it.
    // degree: Degree => The target degree in which the year should be added.
    //
    // OUTPUTS:
    // Modifies the state variable containing the list of Degrees. Finds the matching degree and replaces it with the new, modified one
    // containing the added Year.
    function addYear(name: string, degree: Degree) {
        const newYear: Year = {
            name: name,
            semesters: [],
            id: yearId
        };

        const newId = yearId + 1;
        setYearId(newId);

        const updatedDegree: Degree = {
            ...degree,
            years: [...degree.years, newYear]
        };

        updateGlobalDegreeList(
            globalDegreeList.map(
                (d: Degree): Degree =>
                    d.id === updatedDegree.id ? updatedDegree : d
            )
        );
    }

    // Used to delete a year from a Degree plan
    //
    // INPUTS:
    // targetYear: Year => the target year to delete.
    // targetDegree: Degree => The target degree in which the year should be removed.
    //
    // OUTPUTS:
    // Creates a new list of yeuars containing everything except the target year using filter.
    // Creates a new degree instance with the new list of years.
    // Replaces the target degree in the current list of degrees with the updated one.
    function deleteYear(targetYear: Year, targetDegree: Degree) {
        const newYearList: Year[] = targetDegree.years.filter(
            (year: Year): boolean => year.id !== targetYear.id
        );

        const newDegree: Degree = { ...targetDegree, years: newYearList };

        updateGlobalDegreeList(
            globalDegreeList.map(
                (degree: Degree): Degree =>
                    degree.id === targetDegree.id ? newDegree : degree
            )
        );
    }

    // Used to add/remove semesters from a Year under Degrees.
    //
    // INPUTS:
    // newSemesterList: Semester[] => the new list of semesters containing the desired updates.
    // targetDegree: Degree => The target degree in which to update the Years.
    // targetYear: Year => the target Year in which to update the semesters.
    //
    // OUTPUTS:
    // Finds the correct Year and Degree before modifying the Degree list. Finds the correct degree ID and replaces
    // the old version with the new, updated Degree.
    function updateSemesterList(
        newSemesterList: Semester[],
        targetDegree: Degree,
        targetYear: Year
    ) {
        const newYear: Year = {
            ...targetYear,
            semesters: newSemesterList
        };

        const newYearList: Year[] = targetDegree.years.map(
            (y: Year): Year => (y.id === targetYear.id ? newYear : y)
        );

        const newDegree: Degree = {
            ...targetDegree,
            years: newYearList
        };

        updateGlobalDegreeList(
            globalDegreeList.map(
                (d: Degree): Degree =>
                    d.id === targetDegree.id ? newDegree : d
            )
        );
    }

    // Used to remove degree plans.
    //
    // INPUTS:
    // id: number => the id of the degree to remove.
    //
    // OUTPUTS:
    // Removes the correct ID from the list of degrees and updates the state variable containing the list of degrees.
    function removeDegree(id: number) {
        const newDegrees: Degree[] = globalDegreeList.filter(
            (degree: Degree): boolean => degree.id !== id
        );
        updateGlobalDegreeList(newDegrees);
    }

    return (
        <div className="DegreeList">
            {
                <DegreeList
                    degrees={globalDegreeList}
                    addDegree={addDegree}
                    removeDegree={removeDegree}
                    addYear={addYear}
                    deleteYear={deleteYear}
                    updateSemesterList={updateSemesterList}
                ></DegreeList>
            }
        </div>
    );
};
