import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/src/**/*.entity.{js,ts}'],
  migrations: ['dist/src/migrations/*.{js,ts}'],
  synchronize: true,
  migrationsRun: true,
};
