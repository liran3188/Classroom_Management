import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './student.model';
import { StudentClass } from '../StudentClass.model';
import { db, sequelize } from '../db'

@Injectable()
export class StudentRepository {
  constructor(
    @InjectModel(Student)
    private studentModel: typeof Student,
    @InjectModel(StudentClass)
    private studentClassModel: typeof StudentClass,
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

  async getClasses(id: number): Promise<Number[]> {
    const query = `SELECT class_id FROM public.student_classes WHERE student_id = ${id}`;
    return db.query(query, { type: sequelize.QueryTypes.SELECT })
    .then(results => {
      return (results);
    })
  }

  async deleteConnection(id: number): Promise<number> {
    const deletedRows = await this.studentClassModel.destroy({ where: { studentId: id } });
    return deletedRows;
  }
}
