import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
//local
import { Student } from './student.model';
import { StudentRepository } from './students.repository';
import { ClassesService } from '../classes/classes.service';

@Injectable()
export class StudentsService {
  constructor(
    @Inject(forwardRef(() => ClassesService))
    private readonly classesService: ClassesService,
    private readonly studentRepository: StudentRepository,
  ) {}

  async insertStudent(data: {firstName: string, lastName: string, age: number, occupation: string}): Promise<Student> {
    const studentData = new Student({firstName: data.firstName, lastName: data.lastName, age: data.age, occupation: data.occupation})
      return await this.studentRepository.create(studentData);
  }

  async getStudents(): Promise<Student[]> {
    return await this.studentRepository.findAll();
  }

  async deleteStudent(id: number): Promise<Number> {
    try{
      return await this.studentRepository.delete(id);
    }
    catch (e) {
      throw new NotFoundException 
  }
}

async removeFromClass(id: number): Promise<[affectedCount: number]> {
  try {
    return await this.studentRepository.removeFromClass(id);
  }
  catch (e) {
    throw new NotFoundException
  }
}

async addToClass(classId: number, studentId: number): Promise<[affectedCount: number]> {
  const cap = (await this.classesService.getClass(classId)).capacity;
  const currAmount = (await this.studentRepository.getStudentsForClass(classId)).length;
  if ( cap > currAmount ){
    return await this.studentRepository.addToClass(studentId, classId);
  } else {
    throw new Error;
  }
}

  async getStudent(id: number): Promise<Student> {
    try{
      return await this.studentRepository.findById(id);
    }
    catch (e) {
      throw new NotFoundException
    }
  }
  
  async getStudentsForClass(id: number): Promise<Student[]> {
    return await this.studentRepository.getStudentsForClass(id);
  }

  async removeClass(id: number): Promise<[affectedCount: number]> {
    return await this.studentRepository.removeClass(id);
  }

}
