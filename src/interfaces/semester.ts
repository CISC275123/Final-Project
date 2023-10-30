import { Course } from "./course";
export type SemesterType = "Fall" | "Winter" | "Spring" | "Summer";

export interface SemesterStructure {
    id: number;
    type: SemesterType;
    title: string;
    notes: string;
    maxCredits: number;
    currentCredits: number;
    courseList: Course[];
}
