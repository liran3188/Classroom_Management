import { Sequelize } from 'sequelize-typescript';
import { classrooms } from './classes/class.model'
import { students } from './students/Student.model'
import { studentclass } from './StudentClass/StudentClass.model'
import ConfigService from "./config.service"
import { Module } from '@nestjs/common';
import { log } from 'console';

// const sequelize = require('sequelize');
// const db = new sequelize('some-postgres', 'liran', 'mysecretpassword', {
//   host: 'localhost',
//   dialect: 'postgres'
// });

// export {db, sequelize}


const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize(configService.sequelizeOrmConfig);
            sequelize.addModels([classrooms, students, studentclass]);
            try{
                await sequelize.sync();
                console.log("success");
            } catch (e) {
                console.log("failed");
                
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
export class DataBaseModule {}
