import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import catalog from "./data/catalog.json";
import { Course } from "./interfaces/course";

// Creates default list of courses pulling from a JSON file.
interface JSONCourse {
    code: string;
    name: string;
    descr: string;
    credits: string;
    preReq: string;
    restrict: string;
    breadth: string;
    typ: string;
}

let counter = 1;
const updatedCourseData: {
    [dept: string]: { [courseCode: string]: Course };
} = {};

const updateData: {
    [department: string]: { [courseCode: string]: JSONCourse };
} = catalog;

for (const key in updateData) {
    updatedCourseData[key] = {};
    const courses = updateData[key];
    for (const courseCode in courses) {
        const course = courses[courseCode];
        const courseWithId: Course = {
            ...course,
            id: counter
        };
        updatedCourseData[key][courseCode] = courseWithId;
        counter++;
    }
}
// Store the course list with IDs in the component's state
const COURSES: Course[] = Object.values(updatedCourseData)
    .map(Object.values)
    .flat();

const NUM_COURSES_DISPLAYED = 3;

test("renders the course name somewhere", () => {
    render(<App />);
    const linkElement = screen.getByText(/CISC275/i);
    expect(linkElement).toBeInTheDocument();
});

describe("Semester Tests", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("Users can add a Semester to their Degree Plan", () => {
        // Opens Degree Plan and Adds a Sample Degree
        const degreeButton = screen.getByText("Degrees");
        expect(screen.queryByLabelText("Add")).not.toBeInTheDocument();
        degreeButton.click();
        const button = screen.getByText("Add");
        button.click();
        expect(
            screen.queryByLabelText("Select your desired degree")
        ).toBeInTheDocument();
        const saveButtonDegree = screen.getByText("Save");
        saveButtonDegree.click();
        const text = screen.getByText("Sample Degree");
        text.click();
        expect(screen.queryByText("Sample Degree")).toBeInTheDocument();
        const addYearButton = screen.getByText("Add Year");
        addYearButton.click();
        expect(
            screen.queryByLabelText("Name your new Year:")
        ).toBeInTheDocument();
        const saveButtonYear = screen.getByText("Save");
        saveButtonYear.click();
        expect(screen.queryByText("Freshman")).toBeInTheDocument();
        const addSemester = screen.getByText("Add Semester");
        addSemester.click();
        expect(screen.queryByLabelText("Semester")).toBeInTheDocument();
        const saveSemester = screen.getByText("Save");
        saveSemester.click();
        expect(screen.queryByText("Fall Semester 2023")).toBeInTheDocument();
        const editSemesterButton = screen.getByText("Edit Semester");
        editSemesterButton.click();
        const showCoursesButton = screen.getByText("Show Courses");
        showCoursesButton.click();
        expect(screen.queryByText("Next")).toBeInTheDocument();
        const nextButton = screen.getByText("Next");
        nextButton.click();
        const backButton = screen.getByText("Back");
        backButton.click();
        const addButtons = screen.getAllByText("Add");
        console.log("number of add buttons: " + addButtons.length);
        addButtons[1].click();
        const saveButtonSemester = screen.getByText("Save");
        saveButtonSemester.click();
        const removeCourseButton = screen.getByText("Remove");
        removeCourseButton.click();
        const exitButton = screen.getAllByText("Exit");
        exitButton[1].click();
        editSemesterButton.click();
        showCoursesButton.click();
        const clearCoursesButton = screen.getByText("Clear Courses");
        clearCoursesButton.click();
        expect(
            screen.queryByText("Current Credits: 0 credits")
        ).toBeInTheDocument();
        addButtons[1].click();
        saveButtonSemester.click();
        exitButton[1].click();
        const showCoursesButtonSemesterView = screen.getByText("Show Courses");
        showCoursesButtonSemesterView.click();
    });
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
    test("Users can see a list of courses, including the course code, title, and credits", () => {
        const courseButton = screen.getByText("Courses");
        expect(screen.queryByLabelText("Next")).not.toBeInTheDocument();
        courseButton.click();
        expect(screen.queryByText("Next")).toBeInTheDocument();

        let j = 0;
        const nextButton = screen.getByText("Next");
        while (j < COURSES.length - NUM_COURSES_DISPLAYED) {
            for (let i = j; i < NUM_COURSES_DISPLAYED; i++) {
                expect(
                    screen.queryByText(
                        COURSES[i].code + " : " + COURSES[i].name
                    )
                ).toBeInTheDocument();
                const credits = screen.getAllByText("credit", { exact: false });
                for (let k = 0; k < credits.length; k++)
                    expect(credits[k]).toBeInTheDocument();
            }
            j = j + NUM_COURSES_DISPLAYED;
            nextButton.click();
        }
    });

    test("Users can click on a course to view its information", () => {
        const courseButton = screen.getByText("Courses");
        courseButton.click();

        let j = 0;
        const nextButton = screen.getByText("Next");
        while (j < COURSES.length - NUM_COURSES_DISPLAYED) {
            for (let i = j; i < NUM_COURSES_DISPLAYED; i++) {
                expect(screen.queryByLabelText("Edit")).not.toBeInTheDocument();
                expect(screen.queryByLabelText("Exit")).not.toBeInTheDocument();
                const courseButton = screen.getByText(
                    COURSES[i].code + " : " + COURSES[i].name
                );
                courseButton.click();
                expect(screen.queryByText("Next")).toBeInTheDocument();
                expect(screen.queryByText("Exit")).toBeInTheDocument();

                const exitButton = screen.getByText("Exit");
                exitButton.click();
            }
            j = j + NUM_COURSES_DISPLAYED;
            nextButton.click();
        }
    });

    test("Users can edit a course", () => {
        const courseButton = screen.getByText("Courses");
        courseButton.click();

        let j = 0;
        const nextButton = screen.getByText("Next");
        while (j < COURSES.length - NUM_COURSES_DISPLAYED) {
            for (let i = j; i < NUM_COURSES_DISPLAYED; i++) {
                const courseButton = screen.getByText(
                    COURSES[i].code + " : " + COURSES[i].name
                );
                courseButton.click();

                expect(screen.queryByLabelText("Save")).not.toBeInTheDocument();
                const editButton = screen.getByText("Edit");
                editButton.click();
                expect(screen.queryByText("Save")).toBeInTheDocument();

                const exitButton = screen.getByText("Exit");
                exitButton.click();
            }
            j = j + NUM_COURSES_DISPLAYED;
            nextButton.click();
        }
    });
});
