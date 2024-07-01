import { Injectable } from '@nestjs/common';
import { Students } from './student.model';


@Injectable()
export class StudentRepository {

  async findAll(): Promise<Students[]> {
    return Students.findAll();
  }

  async findById(id: number): Promise<Students> {
    return Students.findByPk(id);
  }

  async create(studentData: Students): Promise<Students> {
    return Students.create(studentData);
  }

  async removeFromClass(id: number) {
    return Students.update({class: null}, {where: {id}})
  }

   
  async addToClass(studentId: number, classId: number) {
    const id = studentId;
    return Students.update({class: classId}, {where: {id}})
  }

  async delete(id: number): Promise<number> {
    const deletedRows = await Students.destroy({ where: { id } });
    return deletedRows;
  }
  async getStudentsForClass(id: number): Promise<Students[]> {
    return Students.findAll({where: {class: id}});
  }

  async removeClass(id: number) {
    return Students.update({class: null}, {where: {class: id}})
  }
}

// function InjectModel(Student: any): (target: typeof StudentRepository, propertyKey: undefined, parameterIndex: 0) => void {
//   throw new Error('Function not implemented.');
// }
