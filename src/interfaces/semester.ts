import { Course } from "./course";

export interface SemesterStructure {
    name: string;
    // type: string;
    // totalCredits: number;
    courses: Course[];
}
