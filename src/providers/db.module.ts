import { Module } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
//local
import ConfigService from './config.service';
import { Classroom } from '../classes/class.model';
import { Student } from '../students/student.model';


const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize(configService.sequelizeOrmConfig);
            sequelize.addModels([Classroom, Student]);
            try {
                await sequelize.sync();
                console.log("success");
            } catch (e) {
                console.log("failed: ", e);

            }

            return sequelize;
        },
        inject: [ConfigService],
    },
];


@Module({
    providers: [...databaseProviders, ConfigService],
    exports: [...databaseProviders, ConfigService],
})
export class DataBaseModule { }
