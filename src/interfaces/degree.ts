import { Year } from "./year";

export interface Degree {
    id: number;
    plan: string;
    name: string;
    years: Year[];
}
