import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
  
  import { StudentsService } from './students.service';
  
  @Controller('Students')
  export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}
  
    @Post()
    addStudent(
      @Body('firstName') firstName: string,
      @Body('lastName') lastName: string,
      @Body('age') age: number,
      @Body('occupation') occupation: string,
    ) {
      const studentId = Math.floor(Math.random() *1000)
      this.studentsService.insertStudent(
        studentId,
        firstName,
        lastName,
        age,
        occupation
      );
    }
  
    @Get()
    getAllStudents() {
      return this.studentsService.getStudents();
    }

    @Get(':id')
    getClass(
      @Param('id') id: number
    ) {
      this.studentsService.getStudent(id)
    }

    @Get()
    getClasses(
        @Body('id') studentId: number
    ) {
        this.studentsService.getClasses(studentId);
    }
  
    @Delete()
    deleteStudent(@Body('id') studentId: number) {
        this.studentsService.deleteStudent(studentId);
        return null;
    }
  }
