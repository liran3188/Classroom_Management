import { students } from "./Student.model";

export const studentProviders = [
    {
    provide: "STUDENT",
    useValue: students
    }

]
