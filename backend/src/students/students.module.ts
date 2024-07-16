import { Module, forwardRef } from '@nestjs/common';

import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { StudentRepository } from './students.repository';
import { ClassesModule } from 'src/classes/classes.module';
import { ClassesService } from 'src/classes/classes.service';

@Module({
    imports: [forwardRef(() => ClassesModule)],
    controllers: [StudentsController],
    providers: [StudentsService, StudentRepository, ClassesService],
    exports: [StudentsService, StudentRepository]
})
export class StudentsModule {}