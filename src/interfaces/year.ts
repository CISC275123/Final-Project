import { Semester } from "./semester";
export interface Year {
    name: string;
    semesters: Semester[];
    id: number;
}
