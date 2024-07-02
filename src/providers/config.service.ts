import { config } from './config.dev';

import { Injectable } from '@nestjs/common';

@Injectable()
export default class ConfigService {
    get sequelizeOrmConfig() {
        return config.database;
    }
}
