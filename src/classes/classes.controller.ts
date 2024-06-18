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
  
  @Controller('Classes')
  export class ClassesController {
    constructor(private readonly classesService: ClassesService) {}
  
    @Post()
    addClass(
      @Body('name') className: string,
      @Body('capacity') classCapacity: number,
    ) {
      const classId = Math.floor(Math.random() *1000)
      this.classesService.insertClass(
        classId,
        className,
        classCapacity,
      );
    }

    @Post(':studentId')
    addStudent(
      @Param('studentId') studentId: number,
      @Body('classId') classId: number
    ) {
      this.classesService.addStudent(classId, studentId);
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

    @Get(':id')
    getClass(
      @Param('id') id: number
    ) {
      this.classesService.getClass(id)
    }

    @Get()
    getStudents(
        @Body('id') classId: number
    ) {
        this.classesService.getStudents(classId);
    }
  
    @Delete()
    removeClass(@Body('id') classId: number) {
        this.classesService.deleteClass(classId);
        return null;
    }
  }
