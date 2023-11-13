import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the course name somewhere", () => {
    render(<App />);
    const linkElement = screen.getByText(/CISC275/i);
    expect(linkElement).toBeInTheDocument();
});

describe("App Tests", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("Users can add a new degree plan", () => {
        const degreeButton = screen.getByText("Degrees");
        expect(screen.queryByLabelText("Add")).not.toBeInTheDocument();
        degreeButton.click();

        const button = screen.getByText("Add");
        expect(
            screen.queryByLabelText(
                "Give your new degree plan a memorable name:"
            )
        ).not.toBeInTheDocument();
        button.click();
        expect(
            screen.queryByLabelText(
                "Give your new degree plan a memorable name:"
            )
        ).toBeInTheDocument();

        const saveButton = screen.getByText("Save");
        saveButton.click();
        expect(screen.queryByText("Sample Degree")).toBeInTheDocument();
    });

    test("Users can delete a new degree plan", () => {
        // Add a sample degree
        const degreeButton = screen.getByText("Degrees");
        degreeButton.click();
        const button = screen.getByText("Add");
        button.click();
        const saveButton = screen.getByText("Save");
        saveButton.click();

        const deleteDegree = screen.getByText("Remove");
        expect(screen.queryByText("Sample Degree")).toBeInTheDocument();
        deleteDegree.click();
        expect(screen.queryByText("Sample Degree")).not.toBeInTheDocument();
    });

    test("Users can select a degree plan they made and view it", () => {
        // Opens Degree Plan and Adds a Sample Degree
        const degreeButton = screen.getByText("Degrees");
        degreeButton.click();
        const button = screen.getByText("Add");
        button.click();
        const saveButton = screen.getByText("Save");
        saveButton.click();

        const text = screen.getByText("Sample Degree");
        text.click();
        expect(screen.queryByText("Add Year")).toBeInTheDocument();
    });

    test("Users can exit a degree plan after clicking on it", () => {
        // Opens Degree Plan and Adds a Sample Degree
        const degreeButton = screen.getByText("Degrees");
        degreeButton.click();
        const button = screen.getByText("Add");
        button.click();
        const saveButton = screen.getByText("Save");
        saveButton.click();

        const text = screen.getByText("Sample Degree");
        text.click();

        const exitDegree = screen.getByText("Exit");
        expect(screen.queryByText("Add Year")).toBeInTheDocument();
        exitDegree.click();
        expect(screen.queryByText("Add Year")).not.toBeInTheDocument();
    });

    test("Users can add a Year to a Degree Plan", () => {
        // Opens Degree Plan and Adds a Sample Degree
        const degreeButton = screen.getByText("Degrees");
        degreeButton.click();
        const button = screen.getByText("Add");
        button.click();
        const saveButtonDegree = screen.getByText("Save");
        saveButtonDegree.click();

        // Opens Sample Degree
        const text = screen.getByText("Sample Degree");
        text.click();

        const addYear = screen.getByText("Add Year");
        expect(
            screen.queryByLabelText("Name your new Year:")
        ).not.toBeInTheDocument();
        addYear.click();
        expect(
            screen.queryByLabelText("Name your new Year:")
        ).toBeInTheDocument();

        const saveButtonYear = screen.getByText("Save");
        saveButtonYear.click();
        expect(screen.queryByText("Freshman")).toBeInTheDocument();
    });

    test("Users can add a Semester from their Degree Plan", () => {
        // Opens Degree Plan and Adds a Sample Degree
        const degreeButton = screen.getByText("Degrees");
        degreeButton.click();
        const button = screen.getByText("Add");
        button.click();
        const saveButtonDegree = screen.getByText("Save");
        saveButtonDegree.click();

        // Opens Sample Degree
        const text = screen.getByText("Sample Degree");
        text.click();

        // Adds a Freshman Year
        const addYear = screen.getByText("Add Year");
        addYear.click();
        const saveButtonYear = screen.getByText("Save");
        saveButtonYear.click();

        //Checks if Add Semester button works
        const addSemesterButton = screen.getByText("Add Semester");
        addSemesterButton.click();
        expect(screen.queryByText("Semester")).toBeInTheDocument();

        //Checks if Save button works
        const saveButtonForMakeSemester = screen.getByText("Save");
        saveButtonForMakeSemester.click();
        expect(screen.queryByText("Freshman")).toBeInTheDocument();

        //Checks if Edit Semester button works
        const editSemesterButton = screen.getByText("Edit Semester");
        editSemesterButton.click();
        expect(screen.queryByText("Show Courses")).toBeInTheDocument();

        //Checks if Show Courses button works
        const showCoursesButton = screen.getByText("Show Courses");
        showCoursesButton.click();
        expect(screen.queryByText("Show Courses")).toBeInTheDocument();
    });
    test("Users can delete a Year from their Degree Plan", () => {
        // Opens Degree Plan and Adds a Sample Degree
        const degreeButton = screen.getByText("Degrees");
        degreeButton.click();
        const button = screen.getByText("Add");
        button.click();
        const saveButtonDegree = screen.getByText("Save");
        saveButtonDegree.click();

        // Opens Sample Degree
        const text = screen.getByText("Sample Degree");
        text.click();

        // Adds a Freshman Year
        const addYear = screen.getByText("Add Year");
        addYear.click();
        const saveButtonYear = screen.getByText("Save");
        saveButtonYear.click();

        expect(screen.queryByText("Delete Year")).toBeInTheDocument();
        const deleteYear = screen.getByText("Delete Year");
        expect(screen.queryByText("Freshman")).toBeInTheDocument();
        deleteYear.click();
        expect(screen.queryByLabelText("Freshman")).not.toBeInTheDocument();
    });
});
