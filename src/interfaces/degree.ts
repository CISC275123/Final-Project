import { DegreeBase } from "./degreebase";
import { Year } from "./year";

export interface Degree {
    id: number;
    plan: DegreeBase;
    name: string;
    years: Year[];
}
