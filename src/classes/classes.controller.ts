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
  import { CreateClassroomDto } from './class.DTO'
  
  @Controller('classes')
  export class ClassesController {
    constructor(private readonly classesService: ClassesService) {}
  
    @Post()
    addClass(
      @Body() CreateClassroomDto: CreateClassroomDto
    ) {
      this.classesService.insertClass(
        CreateClassroomDto
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

    @Get('students/:id')
    getStudents(
        @Param('id') classId: number
    ) {
      return this.classesService.getStudents(classId);
    }
  
    @Delete()
    removeClass(@Body('id') classId: number) {
      return this.classesService.deleteClass(classId);
    }
  }