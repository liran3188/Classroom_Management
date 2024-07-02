import { Module } from '@nestjs/common';
//local
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DataBaseModule } from 'src/providers/db.module';
import { ClassesModule } from '../classes/classes.module';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [DataBaseModule, ClassesModule, StudentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
