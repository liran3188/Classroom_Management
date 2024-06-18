import { Injectable, NotFoundException } from '@nestjs/common';
import { ClassRepository } from './classes.repository';
import { classrooms } from './class.model';
import { StudentClassService } from 'src/StudentClass/StudentClass.service';

@Injectable()
export class ClassesService {
  constructor(
    private readonly classRepository: ClassRepository,
    private readonly studentClassService: StudentClassService
  ) { }

  async insertClass(id: number, name: string, capacity: number): Promise<classrooms> {
    const classroomData = new classrooms(id, name, capacity)
    return this.classRepository.create(classroomData);
  }

  async getClasses(): Promise<classrooms[]> {
    return this.classRepository.findAll();
  }

  async deleteClass(id: number) {
    try {
      this.studentClassService.deleteClass(id);
      return this.classRepository.delete(id);
    }
    catch (e) {
      throw new NotFoundException
    }
  }

  async getClass(id: number): Promise<classrooms> {
    try {
      return this.classRepository.findById(id);
    }
    catch (e) {
      throw new NotFoundException
    }
  }

  //connecting table
  removeStudent(classId: number, studentId: number) {
    try {
      return this.studentClassService.removeStudent(studentId, classId);
    }
    catch (e) {
      throw new NotFoundException
    }
  }

  addStudent(classId: number, studentId: number) {
    return this.studentClassService.addStudent(studentId, classId);
  }

  getStudents(id: number) {
    try {
      return this.studentClassService.getStudents(id);
    }
    catch (e) {
      throw new NotFoundException
    }
  }
}
