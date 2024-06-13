import { Injectable, NotFoundException } from '@nestjs/common';

import { Student } from './student.model';


@Injectable()
export class StudentsService {

  insertStudent(id: number, firstName: string, lastName: string, age: number, occupation: string) {
    const newStudent = new Student(id, firstName, lastName, age, occupation);
    //put in DB
  }

  deleteStudent(id: number) {
    //remove from DB
}

  getStudents() {
    //get from DB
  }

  getClasses(id:number){
    //get from DB
  }
}