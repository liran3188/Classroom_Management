import { Injectable } from '@nestjs/common';
import { Classroom } from './class.model';
import { CreateClassroomDto } from './class.DTO'

@Injectable()
export class ClassRepository {

  async findAll(): Promise<Classroom[]> {    
    return await Classroom.findAll();
  }

  async findById(id: number): Promise<Classroom> {
    return await Classroom.findByPk(id);
  }

  async create(CreateClassroomDto: CreateClassroomDto): Promise<Classroom> {
    return await Classroom.create(CreateClassroomDto);
  }

  async delete(id: number): Promise<number> {
    return await await Classroom.destroy({ where: { id } });
  }
}