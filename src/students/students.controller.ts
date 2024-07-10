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
  import { CreateStudentDto } from './student.DTO';
  
  @Controller('students')
  export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}
  
    @Post()
    addStudent(
      @Body() CreateStudentDto: CreateStudentDto
    ) {
      this.studentsService.insertStudent(
        CreateStudentDto
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
      return this.studentsService.getStudent(id)
    }

    @Patch()
    removeStudent(
      @Body('id') id: number,
    ) {
      return this.studentsService.removeFromClass(id);
    }

  
    @Delete()
    deleteStudent(@Body('id') studentId: number) {
      return this.studentsService.deleteStudent(studentId);
    }
 
    @Patch('assign')
    addToClass(
      @Body('studentId') studentId: number,
      @Body('classId') classId: number
    ) {
      this.studentsService.addToClass(classId, studentId);
    }
    
  }