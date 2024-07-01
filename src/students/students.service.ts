import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { StudentRepository } from './students.repository';
import { Students } from './student.model';
import { ClassesService } from 'src/classes/classes.service';

@Injectable()
export class StudentsService {
  constructor(
    @Inject(forwardRef(() => ClassesService))
    private readonly classesService: ClassesService,
    private readonly studentRepository: StudentRepository,
  ) {}

  async insertStudent(id: number, data: {firstName: string, lastName: string, age: number, occupation: string, class: number}): Promise<Students> {
    const classroomData = new Students({id: id, firstName: data.firstName, lastName: data.lastName, age: data.age, occupation: data.occupation, class: data.class})
    if ( (await this.classesService.getClass(classroomData.class)).capacity > (await this.studentRepository.getStudentsForClass(classroomData.class)).length){
      return this.studentRepository.create(classroomData);
    } else {
      throw new Error;
    }
  }

  async getStudents(): Promise<Students[]> {
    return this.studentRepository.findAll();
  }

  async deleteStudent(id: number) {
    try{
      return this.studentRepository.delete(id);
    }
    catch (e) {
      throw new NotFoundException 
  }
}

removeFromClass(id: number) {
  try {
    return this.studentRepository.removeFromClass(id);
  }
  catch (e) {
    throw new NotFoundException
  }
}

async addToClass(classId: number, studentId: number) {
  if ( (await this.classesService.getClass(classId)).capacity > (await this.studentRepository.getStudentsForClass(classId)).length){
    return this.studentRepository.addToClass(studentId, classId);
  } else {
    throw new Error;
  }
}

  async getStudent(id: number): Promise<Students> {
    try{
      return this.studentRepository.findById(id);
    }
    catch (e) {
      throw new NotFoundException
    }
  }
  
  async getStudentsForClass(id: number): Promise<Students[]> {
    return this.studentRepository.getStudentsForClass(id);
  }

  async removeClass(id: number) {
    return this.studentRepository.removeClass(id);
  }

}