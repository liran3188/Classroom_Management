import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    HttpException, 
    HttpStatus
  } from '@nestjs/common';
  import { StudentsService } from './students.service';
  import { CreateStudentDto } from './student.DTO';
  
  @Controller('students')
  export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}
  
    @Post()
    async addStudent(
      @Body() CreateStudentDto: CreateStudentDto
    ) {
      try {
        await this.studentsService.insertStudent(
          CreateStudentDto
        );
      }
      catch (e) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: e.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }
  
    @Get()
    getAllStudents() {
      try {
        return this.studentsService.getStudents();

      }
      catch (e) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: e.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }

    @Get(':id')
    getClass(
      @Param('id') id: number
    ) {
      try {
        return this.studentsService.getStudent(id)

      }
      catch (e) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: e.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }

    @Patch()
    removeStudent(
      @Body('id') id: number,
    ) {
      try {
        return this.studentsService.removeFromClass(id);

      }
      catch (e) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: e.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }

  
    @Delete()
    deleteStudent(@Body('id') studentId: number) {
      try {
        return this.studentsService.deleteStudent(studentId);

      }
      catch (e) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: e.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }
 
    @Patch('assign')
    async addToClass(
      @Body('studentId') studentId: number,
      @Body('classId') classId: number
    ) {
      try {
        this.studentsService.addToClass(classId, studentId);
      } catch (e) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: e.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }
    
  }