import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentRepository } from './students.repository';
import { Student } from './student.model';


@Injectable()
export class StudentsService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async insertStudent(id: number, firstName: string, lastName: string, age: number, occupation: string): Promise<Student> {
    const classroomData = new Student(id, firstName, lastName, age, occupation)
    return this.studentRepository.create(classroomData);
  }

  async getStudents(): Promise<Student[]> {
    return this.studentRepository.findAll();
  }

  async deleteStudent(id: number) {
    try{
      this.studentRepository.deleteConnection(id);
      return this.studentRepository.delete(id);
    }
    catch (e) {
      throw new NotFoundException 
  }
}

  async getStudent(id: number): Promise<Student> {
    try{
      return this.studentRepository.findById(id);
    }
    catch (e) {
      throw new NotFoundException
    }
  }

  //connecting table
  getClasses(id:number){
    try{
      return this.studentRepository.getClasses(id);
    }
    catch (e) {
      throw new NotFoundException
    }
  }
}
