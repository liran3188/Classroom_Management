import { studentclass } from "./StudentClass.model";

export const studentClassProviders = [
    { provide: "STUDENT_CLASS", useValue: studentclass }
];