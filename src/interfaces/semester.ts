import { Course } from "./course";
export type SemesterType = "Fall" | "Winter" | "Spring" | "Summer";
export interface Semester {
    type: SemesterType;
    courses: Course[];
}
