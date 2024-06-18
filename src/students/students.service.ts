import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentRepository } from './students.repository';
import { students } from './student.model';
import { StudentClassService } from 'src/StudentClass/StudentClass.service';


@Injectable()
export class StudentsService {
  constructor(private readonly studentRepository: StudentRepository,
    private readonly studentClassService: StudentClassService) {}

  async insertStudent(id: number, firstName: string, lastName: string, age: number, occupation: string): Promise<students> {
    const classroomData = new students(id, firstName, lastName, age, occupation)
    return this.studentRepository.create(classroomData);
  }

  async getStudents(): Promise<students[]> {
    return this.studentRepository.findAll();
  }

  async deleteStudent(id: number) {
    try{
      this.studentClassService.deleteStudent(id);
      return this.studentRepository.delete(id);
    }
    catch (e) {
      throw new NotFoundException 
  }
}

  async getStudent(id: number): Promise<students> {
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
      return this.studentClassService.getClasses(id);
    }
    catch (e) {
      throw new NotFoundException
    }
  }
}
