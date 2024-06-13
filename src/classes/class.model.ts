import { Student } from "src/students/student.model";

export class Class {
    constructor(
        public id: number,
        public name: string,
        public capacity: number,
        public students: Student[]
    ) {}
}