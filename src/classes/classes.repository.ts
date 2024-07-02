import { Classroom } from './class.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClassRepository {

  async findAll(): Promise<Classroom[]> {    
    return await Classroom.findAll();
  }

  async findById(id: number): Promise<Classroom> {
    return await Classroom.findByPk(id);
  }

  async create(classroomData: Classroom): Promise<Classroom> {
    return await Classroom.create(classroomData);
  }

  async delete(id: number): Promise<number> {
    return await await Classroom.destroy({ where: { id } });
  }
}
