import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Class } from './class.model';
import { StudentClass } from 'src/StudentClass.model';
import { db, sequelize } from '../db'

@Injectable()
export class ClassRepository {
  constructor(
    @InjectModel(Class)
    private classroomModel: typeof Class,
    @InjectModel(StudentClass)
    private studentClassModel: typeof StudentClass,
  ) {}

  async findAll(): Promise<Class[]> {
    return this.classroomModel.findAll();
  }

  async findById(id: number): Promise<Class> {
    return this.classroomModel.findByPk(id);
  }

  async create(classroomData: Class): Promise<Class> {
    return this.classroomModel.create(classroomData);
  }

  async delete(id: number): Promise<number> {
    const deletedRows = await this.classroomModel.destroy({ where: { id } });
    return deletedRows;
  }

  async addStudent(studentId, classId) {
    const data = new StudentClass(studentId, classId)
    return this.studentClassModel.create(data)
  }

  async getStudents(id: number): Promise<number[]> {
    const query = `SELECT student_id FROM public.student_classes WHERE class_id = ${id}`;
    return db.query(query, { type: sequelize.QueryTypes.SELECT })
    .then(results => {
      return (results);
    })
  }

  async deleteConnection(id: number): Promise<number> {
    const deletedRows = await this.studentClassModel.destroy({ where: { classId: id } });
    return deletedRows;
  }

  async removeStudent(studentId, classId): Promise<number> {
    const deletedRows = await this.studentClassModel.destroy({ where: { classId: classId, studentId: studentId  } });
    return deletedRows;
  }
}
