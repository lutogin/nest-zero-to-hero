import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthenticationMiddleware } from './authentication.middleware';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TasksModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthenticationMiddleware)
      .forRoutes(
        { method: RequestMethod.POST, path: '/tasks' },
        { method: RequestMethod.PATCH, path: '/tasks/:id' },
        { method: RequestMethod.DELETE, path: '/tasks/:id' },
      )
  }
}
