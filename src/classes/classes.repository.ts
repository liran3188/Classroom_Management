import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { classrooms } from './class.model';

@Injectable()
export class ClassRepository {
  classroomModel: any;
    constructor(
        @Inject("CLASS") classroomModel: classrooms
    ) {}

  async findAll(): Promise<classrooms[]> {
    console.log("hey");
    
    return this.classroomModel.findAll();
  }

  async findById(id: number): Promise<classrooms> {
    return this.classroomModel.findByPk(id);
  }

  async create(classroomData: classrooms): Promise<classrooms> {
    return this.classroomModel.create(classroomData);
  }

  async delete(id: number): Promise<number> {
    const deletedRows = await this.classroomModel.destroy({ where: { id } });
    return deletedRows;
  }
}
