import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Class } from './class.model';

@Injectable()
export class ClassRepository {
  constructor(
    @InjectModel(Class)
    private classroomModel: typeof Class,
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
}
