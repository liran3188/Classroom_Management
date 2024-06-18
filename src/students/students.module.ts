import { Module } from '@nestjs/common';

import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { DataBaseModule } from 'src/db.module';
import { StudentClassModule } from 'src/StudentClass/StudentClass.module';
import { StudentRepository } from './students.repository';
import { studentProviders } from './providers';

@Module({
    imports: [StudentClassModule, DataBaseModule],
    controllers: [StudentsController],
    providers: [StudentsService, StudentRepository, ...studentProviders],
})
export class StudentsModule {}
