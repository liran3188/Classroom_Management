import { Injectable } from '@nestjs/common';
import { Classrooms } from './class.model';

@Injectable()
export class ClassRepository {

  async findAll(): Promise<Classrooms[]> {    
    return Classrooms.findAll();
  }

  async findById(id: number): Promise<Classrooms> {
    return Classrooms.findByPk(id);
  }

  async create(classroomData: Classrooms): Promise<Classrooms> {
    return Classrooms.create(classroomData);
  }

  async delete(id: number): Promise<number> {
    const deletedRows = await Classrooms.destroy({ where: { id } });
    return deletedRows;
  }
}