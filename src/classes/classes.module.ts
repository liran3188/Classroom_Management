import { Module } from '@nestjs/common';

import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { ClassRepository } from './classes.repository';
import { StudentClass } from 'src/StudentClass.model';

@Module({
    imports: [StudentClass],
    controllers: [ClassesController],
    providers: [ClassesService, ClassRepository],
})
export class ClassesModule {}
