import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { SECRET } from '../../config/module.config';
import { User } from '../users/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKey: SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<User > {
    const { id, email } = payload;
    const user = await getRepository(User).findOne({ id, email });

    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    return user;
  }
}
