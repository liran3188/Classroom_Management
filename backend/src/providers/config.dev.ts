import { Dialect } from 'sequelize/types';

export const config = {
    database: {
        dialect: 'postgres' as Dialect,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: 'postgres',
        password: 'mysecretpassword',
        database: 'Classrooms',
        logging: process.env.DB_LOGGING === 'true',
    }
};