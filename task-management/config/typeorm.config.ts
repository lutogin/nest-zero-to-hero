import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from '../src/tasks/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
  synchronize: true,
  migrationsRun: true,
};
