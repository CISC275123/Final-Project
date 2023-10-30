import { Course } from "./course";

export interface SemesterStructure {
    id: number;
    title: string;
    notes: string;
    maxCredits: number;
    currentCredits: number;
    courseList: Course[];
}
