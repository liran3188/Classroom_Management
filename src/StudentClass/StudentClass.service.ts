import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentClassRepository } from './StudentClass.repository';
import { studentclass } from './StudentClass.model';

@Injectable()
export class StudentClassService {
  constructor(private readonly studentClassRepository: StudentClassRepository) {}

  async deleteClass(id: number) {
    try{
        return this.studentClassRepository.deleteClassConnection(id);
    }
    catch (e) {
      throw new NotFoundException
    }
  }

  removeStudent(classId: number, studentId: number) {
    try{
      return this.studentClassRepository.removeStudent(studentId, classId);
    }
    catch (e) {
      throw new NotFoundException
    }
  }

  addStudent(classId: number, studentId: number) {
    return this.studentClassRepository.addStudent(studentId, classId);
  }

  getStudents(id: number) {
    try{
      return this.studentClassRepository.getStudents(id);
    }
    catch (e) {
      throw new NotFoundException
    }
  }

  deleteStudent(id:number) {
    try{
        return this.studentClassRepository.deleteStudentConnection(id);
    }
    catch (e) {
      throw new NotFoundException
    }
  }

  getClasses(id: number) {
    try{
        return this.studentClassRepository.getClasses(id);
      }
      catch (e) {
        throw new NotFoundException
      }
  }
}
