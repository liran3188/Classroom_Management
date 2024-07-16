import { Injectable } from '@nestjs/common';
import { config } from './config.dev';

@Injectable()
export default class ConfigService {
    get sequelizeOrmConfig() {
        return config.database;
    }
}