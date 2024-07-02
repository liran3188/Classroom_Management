import { Module, forwardRef } from '@nestjs/common';
//local
import { ClassesService } from './classes.service';
import { ClassRepository } from './classes.repository';
import { DataBaseModule } from '../providers/db.module';
import { ClassesController } from './classes.controller';
import { StudentsModule } from 'src/students/students.module';
import { StudentsService } from 'src/students/students.service';

@Module({
    imports: [ forwardRef(() => StudentsModule)],
    controllers: [ClassesController],
    providers: [ClassesService, ClassRepository, StudentsService],
    exports: [ClassesService, ClassRepository]
})
export class ClassesModule {}
