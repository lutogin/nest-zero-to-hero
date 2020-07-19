import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DATABASE_URL } from './module.config';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: DATABASE_URL,
  entities: ['dist/src/**/*.entity.{js,ts}'],
  migrations: ['dist/src/migrations/*.{js,ts}'],
  synchronize: true,
  migrationsRun: true,
};
