import { Course } from "./course";

export interface Semester {
    id: number;
    title: string;
    notes: string;
    maxCredits: number;
    currentCredits: number;
    courses: Course[];
}
