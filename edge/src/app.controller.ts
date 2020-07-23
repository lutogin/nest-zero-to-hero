import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy
  ) {}

  async onApplicationBootstrap() {
    await this.authClient.connect();
  }

  @Get()
  test(): Observable<string> {
    const pattern = { meta: 'test'};
    return this.authClient.send<any>(pattern, 'HELLO FROM EDGE');
  }
}
