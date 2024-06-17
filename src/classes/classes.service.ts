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
    try{
      this.classRepository.deleteConnection(id);
      return this.classRepository.delete(id);
    }
    catch (e) {
      throw new NotFoundException
    }
  }

  async getClass(id: number): Promise<Class> {
    try{
      return this.classRepository.findById(id);
    }
    catch (e) {
      throw new NotFoundException
    }
  }

  //connecting table
  removeStudent(classId: number, studentId: number) {
    try{
      return this.classRepository.removeStudent(studentId, classId);
    }
    catch (e) {
      throw new NotFoundException
    }
  }

  addStudent(classId: number, studentId: number) {
    return this.classRepository.addStudent(studentId, classId);
  }

  getStudents(id: number) {
    try{
      return this.classRepository.getStudents(id);
    }
    catch (e) {
      throw new NotFoundException
    }
  }
}
