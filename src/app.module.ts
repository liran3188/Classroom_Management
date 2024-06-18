import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassesModule } from './classes/classes.module';
import { StudentsModule } from './students/students.module';
import { StudentClassModule } from './StudentClass/StudentClass.module'


@Module({
  imports: [ClassesModule, StudentsModule, StudentClassModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
