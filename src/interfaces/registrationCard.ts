import { CourseBackend } from "./courseBackend";
import { SemesterBackEnd } from "./semesterBackend";

export interface RegistrationCard {
    semester: SemesterBackEnd;
    totalCredit: number;
    courseSelected: CourseBackend[];
}
