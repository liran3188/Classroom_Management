import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './student.model';

@Injectable()
export class StudentRepository {
  constructor(
    @InjectModel(Student)
    private studentModel: typeof Student,
  ) {}

  async findAll(): Promise<Student[]> {
    return this.studentModel.findAll();
  }

  async findById(id: number): Promise<Student> {
    return this.studentModel.findByPk(id);
  }

  async create(studentData: Student): Promise<Student> {
    return this.studentModel.create(studentData);
  }

  async delete(id: number): Promise<number> {
    const deletedRows = await this.studentModel.destroy({ where: { id } });
    return deletedRows;
  }
}
