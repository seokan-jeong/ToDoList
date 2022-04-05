import * as config from 'config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { List } from '../lists/list.entity';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  entities: [List],
  synchronize: dbConfig.synchronize,
};
