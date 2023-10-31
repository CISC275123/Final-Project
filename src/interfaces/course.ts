export interface Course {
    id: string;
    name: string;
    credits: number;
    prerequisites: string[] | null;
    restrictions: string;
    description: string;
    corequisites: string[] | null;
}
