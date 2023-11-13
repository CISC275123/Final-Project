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
});
