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
    test("Users can add a new semester to a year", () => {
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

        // Adds a new semester
        const addSemester = screen.getByText("Add Semester");
        addSemester.click();
        const saveSemester = screen.getByText("Save");
        saveSemester.click();

        expect(screen.queryByText("Edit Semester")).toBeInTheDocument();
        expect(screen.queryByText("Delete Semester")).toBeInTheDocument();
        expect(screen.queryByText("Fall Semester 2023")).toBeInTheDocument();
    });

    test("Users can delete a semester", () => {
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

        // Adds a new semester
        const addSemester = screen.getByText("Add Semester");
        addSemester.click();
        const saveSemester = screen.getByText("Save");
        saveSemester.click();

        expect(screen.queryByText("Delete Semester")).toBeInTheDocument();
        const deleteSemester = screen.getByText("Delete Semester");
        expect(screen.queryByText("Fall Semester 2023")).toBeInTheDocument();
        deleteSemester.click();
        expect(
            screen.queryByLabelText("Fall Semester 2023")
        ).not.toBeInTheDocument();
    });

    test("Users can edit a semester", () => {
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

        // Adds a new semester
        const addSemester = screen.getByText("Add Semester");
        addSemester.click();
        const saveSemester = screen.getByText("Save");
        saveSemester.click();

        expect(screen.queryByText("Edit Semester")).toBeInTheDocument();
        const editSemester = screen.getByText("Edit Semester");
        expect(screen.queryByText("Fall Semester 2023")).toBeInTheDocument();
        editSemester.click();
        expect(
            screen.queryByText("Fall Semester 2023 ID: 1")
        ).toBeInTheDocument();
    });

    test("Users can add a course to a semester", () => {
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

        // Adds a new semester
        const addSemester = screen.getByText("Add Semester");
        addSemester.click();
        const saveSemester = screen.getByText("Save");
        saveSemester.click();

        // Add courses
        const editSemester = screen.getByText("Edit Semester");
        editSemester.click();
        const showCourses = screen.getByText("Show Courses");
        showCourses.click();
        const addCourse = screen.getAllByText("Add")[1];
        addCourse.click();
        const save = screen.getByText("Save");
        save.click();
        expect(screen.queryByText("Remove")).toBeInTheDocument();
    });

    test("Users can remove a course from a semester", () => {
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

        // Adds a new semester
        const addSemester = screen.getByText("Add Semester");
        addSemester.click();
        const saveSemester = screen.getByText("Save");
        saveSemester.click();

        // Add courses
        const editSemester = screen.getByText("Edit Semester");
        editSemester.click();
        const showCourses = screen.getByText("Show Courses");
        showCourses.click();
        const addCourse = screen.getAllByText("Add")[1];
        addCourse.click();
        const save = screen.getByText("Save");
        save.click();
        expect(screen.queryByText("Remove")).toBeInTheDocument();
        const remove = screen.getByText("Remove");
        remove.click();
        expect(screen.queryByText("Remove")).not.toBeInTheDocument();
    });
});
