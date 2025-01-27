import { Injectable } from '@nestjs/common';
import { Student } from './student.model';
import { CreateStudentDto } from './student.DTO';


@Injectable()
export class StudentRepository {

  async findAll(): Promise<Student[]> {
    return await Student.findAll();
  }

  async findById(id: number): Promise<Student> {
    return await Student.findByPk(id);
  }

  async create(createStudentDto: CreateStudentDto) {
    await Student.create(createStudentDto);
  }

  async removeFromClass(id: number): Promise<[affectedCount: number]> {
    return await Student.update({ class: null }, { where: { id } })
  }

  async addToClass(studentId: number, classId: number): Promise<[affectedCount: number]> {
    return await Student.update({ class: classId }, { where: { id: studentId } })
  }

  async delete(id: number): Promise<number> {
    return await Student.destroy({ where: { id } });
  }

  async getStudentsForClass(id: number): Promise<Student[]> {
    return await Student.findAll({ where: { class: id } });
  }

  async removeClass(id: number): Promise<[affectedCount: number]> {
    return await Student.update({ class: null }, { where: { class: id } })
  }
}
