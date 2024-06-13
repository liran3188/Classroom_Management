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
  
  @Controller('products')
  export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}
  
    @Post()
    addStudent(
      @Body('id') studentId: number,
      @Body('firstName') firstName: string,
      @Body('lastName') lastName: string,
      @Body('age') age: number,
      @Body('occupation') occupation: string,
    ) {
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

    @Get('id')
    getClasses(
        @Param('id') studentId: number
    ) {
        this.studentsService.getClasses(studentId);
    }
  
    @Delete()
    deleteStudent(@Body('id') studentId: number) {
        this.studentsService.deleteStudent(studentId);
        return null;
    }
  }