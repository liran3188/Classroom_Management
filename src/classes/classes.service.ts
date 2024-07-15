import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { ClassRepository } from './classes.repository';
import { Classroom } from './class.model';
import { StudentsService } from 'src/students/students.service';
import { Student } from 'src/students/student.model';
import { CreateClassroomDto } from './class.DTO' 

@Injectable()
export class ClassesService {
  constructor(
    @Inject(forwardRef(() => StudentsService))
    private readonly studentsService: StudentsService,
    private readonly classRepository: ClassRepository,
  ) { }

  async insertClass(CreateClassroomDto: CreateClassroomDto): Promise<Classroom> {
    return await this.classRepository.create(CreateClassroomDto);
  }

  async getClasses(): Promise<Classroom[]> {
    return await this.classRepository.findAll();
  }

  async deleteClass(id: number): Promise<Number> {
    try {
      await this.studentsService.removeClass(id);
      return await this.classRepository.delete(id);
    }
    catch (e) {
      throw new NotFoundException
    }
  }

  async getClass(id: number): Promise<Classroom> {
    try {
      return await this.classRepository.findById(id);
    }
    catch (e) {
      throw new NotFoundException
    }
  }

  async getStudents(id: number): Promise<Student[]> {
    try {
      return await this.studentsService.getStudentsForClass(id);
    }
    catch (e) {
      throw new NotFoundException
    }
  }
}
