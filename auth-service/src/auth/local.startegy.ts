import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private moduleRef: ModuleRef,
    ) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    email: string,
    password: string
  ): Promise<any> {
    const contextId = ContextIdFactory.getByRequest(req);
    const authService = await this.moduleRef.resolve(AuthService, contextId);
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
