import { Course } from "./course";

export interface SemesterStructure {
    semesterTitle: string;
    maxCredits: number;
    currentCredits: number;
    // courseList: Course[];
}
