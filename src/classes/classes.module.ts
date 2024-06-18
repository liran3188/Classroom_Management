import { Module } from '@nestjs/common';

import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { ClassRepository } from './classes.repository';
import { DataBaseModule } from 'src/db.module';
import { StudentClassModule } from 'src/StudentClass/StudentClass.module';
import { classProviders } from './providers';

@Module({
    imports: [StudentClassModule, DataBaseModule],
    controllers: [ClassesController],
    providers: [ClassesService, ClassRepository, ...classProviders],
})
export class ClassesModule {}
