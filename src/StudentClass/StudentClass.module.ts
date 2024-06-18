import { Module } from '@nestjs/common';

import { DataBaseModule } from 'src/db.module';
import { studentClassProviders } from './providers';
import { StudentClassService } from './StudentClass.service';
import { StudentClassRepository } from './StudentClass.repository';

@Module({
    imports: [DataBaseModule],
    providers: [StudentClassRepository, StudentClassService, ...studentClassProviders],
    exports: [StudentClassService]
})
export class StudentClassModule { }
