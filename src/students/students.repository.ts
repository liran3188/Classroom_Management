import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { students } from './student.model';

@Injectable()
export class StudentRepository {
  studentModel: any;
    constructor(
        @Inject("STUDENT") studentModel: students
    ) {}

  async findAll(): Promise<students[]> {
    return this.studentModel.findAll();
  }

  async findById(id: number): Promise<students> {
    return this.studentModel.findByPk(id);
  }

  async create(studentData: students): Promise<students> {
    return this.studentModel.create(studentData);
  }

  async delete(id: number): Promise<number> {
    const deletedRows = await this.studentModel.destroy({ where: { id } });
    return deletedRows;
  }
}
