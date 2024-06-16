import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassesModule } from './classes/classes.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [ClassesModule, StudentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
