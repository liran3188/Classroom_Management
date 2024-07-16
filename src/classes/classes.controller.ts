import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  
  import { ClassesService } from './classes.service';
  import { CreateClassroomDto } from './class.DTO'
  
  @Controller('classes')
  export class ClassesController {
    constructor(private readonly classesService: ClassesService) {}
  
    @Post()
    async addClass(
      @Body() CreateClassroomDto: CreateClassroomDto
    ) {
      try {
        await this.classesService.insertClass(
          CreateClassroomDto
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
    async getAllClasses() {
      try {
        return await this.classesService.getClasses();
      }
      catch (e) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: e.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }

    @Get(':id')
    async getClass(
      @Param('id') id: number
    ) {
      try {
        return await this.classesService.getClass(id)
      }
      catch (e) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: e.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }

    @Get('students/:id')
    async getStudents(
        @Param('id') classId: number
    ) {
      try {
        return await this.classesService.getStudents(classId);
      }
      catch (e) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: e.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }
  
    @Delete()
    async removeClass(@Body('id') classId: number) {
      try {
        return await this.classesService.deleteClass(classId);
      }
      catch (e) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: e.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }
  }