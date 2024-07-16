import { Sequelize } from 'sequelize-typescript';
import ConfigService from "./config.service"
import { Module } from '@nestjs/common';
import { Student } from 'src/students/student.model';
import { Classroom } from 'src/classes/class.model';

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
