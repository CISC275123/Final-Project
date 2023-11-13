import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import sample from "./data/courses.json";
import { Course } from "./interfaces/course";

// Creates default list of courses pulling from a JSON file.
const COURSES = sample.map(
    (course): Course => ({
        id: course.id,
        name: course.name,
        credits: course.credits as unknown as number,
        prerequisites: course.prereqs as unknown as string[],
        restrictions: course.restrictions as unknown as string,
        description: course.description,
        corequisites: course.coreqs as unknown as string[]
    })
);
const NUM_COURSES_DISPLAYED = 3;

test("renders the course name somewhere", () => {
    render(<App />);
    const linkElement = screen.getByText(/CISC275/i);
    expect(linkElement).toBeInTheDocument();
});

describe("Degree Tests", () => {
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
});

describe("Course Tests", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("Users can see a list of courses, including the course code, and title", () => {
        const courseButton = screen.getByText("Courses");
        expect(screen.queryByLabelText("Next")).not.toBeInTheDocument();
        courseButton.click();
        expect(screen.queryByText("Next")).toBeInTheDocument();

        let j = 0;
        const nextButton = screen.getByText("Next");
        while (j < COURSES.length - NUM_COURSES_DISPLAYED) {
            for (let i = j; i < NUM_COURSES_DISPLAYED; i++) {
                expect(
                    screen.queryByText(COURSES[i].id + " : " + COURSES[i].name)
                ).toBeInTheDocument();
            }
            j = j + NUM_COURSES_DISPLAYED;
            nextButton.click();
        }
    });
});
