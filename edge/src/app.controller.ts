import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private services: AppService
  ) {}

  @Get('/tasks')
  async getTasksList(@Req() req) {
    return this.services.getTasksList();
  }
}
