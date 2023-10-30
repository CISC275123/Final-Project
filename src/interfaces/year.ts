import { Semester } from "./semester";
export type YearType = "Year 1" | "Year 2" | "Year 3" | "Year 4";
export interface Year {
    name: string;
    /*type: YearType;*/
    semesters: Semester[];
}
