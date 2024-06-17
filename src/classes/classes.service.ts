import { Injectable, NotFoundException } from '@nestjs/common';
import { ClassRepository } from './classes.repository';
import { Class } from './class.model';


@Injectable()
export class ClassesService {
  constructor(private readonly classRepository: ClassRepository) {}

  async insertClass(id: number, name: string, capacity: number): Promise<Class> {
    const classroomData = new Class(id, name, capacity)
    return this.classRepository.create(classroomData);
  }

  async getClasses(): Promise<Class[]> {
    return this.classRepository.findAll();
  }

  async deleteClass(id: number) {
    return this.classRepository.delete(id);
    //delete from connecting table
  }

  //connecting table
  removeStudent(classId: number, studentId: number) {
    //remove student from student list
  }

  getStudents(id: number) {
    //get students from DB
  }
}
