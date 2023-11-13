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
                    screen.queryByText(COURSES[i].id + " : " + COURSES[i].name)
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
                    COURSES[i].id + " : " + COURSES[i].name
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
                    COURSES[i].id + " : " + COURSES[i].name
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

describe("Semester Tests", () => {
    beforeEach(() => {
        render(<App />);
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