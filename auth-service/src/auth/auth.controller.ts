import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AuthCredentials } from './dto/auth.credentials';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './JWT-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) authCredentials: AuthCredentials
  ): Promise<void> {
    return this.authService.signUp(authCredentials);
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authCredentials: AuthCredentials
  ): Promise<any> {
    return this.authService.signIn(authCredentials);
  }

  @Post('/gu')
  @UseGuards(JwtAuthGuard)
  gu(@Req() req) {
    const { passwordHash, ...user } = req.user;

    return user;
  }

  @Post('/test')
  @MessagePattern({ meta: 'test' })
  test(msg) {
    console.log('msg ---> ', msg);
    return msg;
  }
}
