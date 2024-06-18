import { classrooms } from "./class.model";

export const classProviders = [
    { provide: "CLASS", useValue: classrooms }
];
