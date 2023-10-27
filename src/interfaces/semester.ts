import { Course } from "./course";

export interface SemesterStructure {
    id: number;
    semesterTitle: string;
    maxCredits: number;
    currentCredits: number;
    courseList: Course[];
}
