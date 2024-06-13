import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
  
  import { ClassesService } from './classes.service';
  
  @Controller('products')
  export class ClassesController {
    constructor(private readonly classesService: ClassesService) {}
  
    @Post()
    addClass(
      @Body('id') classId: number,
      @Body('name') className: string,
      @Body('capacity') classCapacity: number,
    ) {
      this.classesService.insertClass(
        classId,
        className,
        classCapacity,
      );
    }
  
    @Get()
    getAllClasses() {
      return this.classesService.getClasses();
    }

  
    @Patch()
    removeStudent(
      @Body('classId') classId: number,
      @Body('studentId') studentId: number,
    ) {
      this.classesService.removeStudent(classId, studentId);
      return null;
    }

    @Get('id')
    getStudents(
        @Param('id') classId: number
    ) {
        this.classesService.getStudents(classId);
    }
  
    @Delete()
    removeClass(@Body('id') classId: number) {
        this.classesService.deleteClass(classId);
        return null;
    }
  }