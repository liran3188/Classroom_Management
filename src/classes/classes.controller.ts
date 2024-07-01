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
  
  @Controller('classes')
  export class ClassesController {
    constructor(private readonly classesService: ClassesService) {}
  
    @Post()
    addClass(
      @Body('data') data: {name: string, capacity: number}
    ) {
      this.classesService.insertClass(
        null,
        data
      );
    }
  
    @Get()
    getAllClasses() {
      return this.classesService.getClasses();
    }

    @Get(':id')
    getClass(
      @Param('id') id: number
    ) {
      return this.classesService.getClass(id)
    }

    @Get()
    getStudents(
        @Body('id') classId: number
    ) {
      return this.classesService.getStudents(classId);
    }
  
    @Delete()
    removeClass(@Body('id') classId: number) {
        this.classesService.deleteClass(classId);
        return null;
    }
  }