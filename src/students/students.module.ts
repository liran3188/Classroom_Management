import { Module, forwardRef } from '@nestjs/common';
//local
import { StudentsService } from './students.service';
import { StudentRepository } from './students.repository';
import { ClassesModule } from '../classes/classes.module';
import { StudentsController } from './students.controller';
import { ClassesService } from '../classes/classes.service';

@Module({
    imports: [forwardRef(() => ClassesModule)],
    controllers: [StudentsController],
    providers: [StudentsService, StudentRepository, ClassesService],
    exports: [StudentsService, StudentRepository]
})
export class StudentsModule {}
