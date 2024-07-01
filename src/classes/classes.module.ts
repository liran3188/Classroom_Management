import { Module, forwardRef } from '@nestjs/common';

import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { ClassRepository } from './classes.repository';
import { DataBaseModule } from 'src/providers/db.module';
import { StudentsModule } from 'src/students/students.module';
import { StudentsService } from 'src/students/students.service';

@Module({
    imports: [ forwardRef(() => StudentsModule)],
    controllers: [ClassesController],
    providers: [ClassesService, ClassRepository, StudentsService],
    exports: [ClassesService, ClassRepository]
})
export class ClassesModule {}
