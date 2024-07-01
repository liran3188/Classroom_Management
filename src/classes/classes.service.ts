import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { ClassRepository } from './classes.repository';
import { Classrooms } from './class.model';
import { StudentsService } from 'src/students/students.service';
import { Students } from 'src/students/student.model';

@Injectable()
export class ClassesService {
  constructor(
    @Inject(forwardRef(() => StudentsService))
    private readonly studentsService: StudentsService,
    private readonly classRepository: ClassRepository,
  ) { }

  async insertClass(id: number, data: {name: string, capacity: number}): Promise<Classrooms> {
    const classroomData = new Classrooms({id: id, name: data.name, capacity: data.capacity})
    return this.classRepository.create(classroomData);
  }

  async getClasses(): Promise<Classrooms[]> {
    return this.classRepository.findAll();
  }

  async deleteClass(id: number) {
    try {
      this.studentsService.removeClass(id)
      return this.classRepository.delete(id);
    }
    catch (e) {
      throw new NotFoundException
    }
  }

  async getClass(id: number): Promise<Classrooms> {
    try {
      return this.classRepository.findById(id);
    }
    catch (e) {
      throw new NotFoundException
    }
  }

  //connecting table

  getStudents(id: number): Promise<Students[]> {
    try {
      return this.studentsService.getStudentsForClass(id);
    }
    catch (e) {
      throw new NotFoundException
    }
  }
}
