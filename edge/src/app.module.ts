import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE_HOST, AUTH_SERVICE_PORT } from '../config/module.config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: AUTH_SERVICE_HOST,
          port: +AUTH_SERVICE_PORT,
        },
      },
    ])
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
