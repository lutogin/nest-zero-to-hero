import { createParamDecorator } from '@nestjs/common';
import { get } from 'lodash';
import { User } from '../interfaces/user.interface';

export const GetUser = createParamDecorator((data, req): User => {
  return get(req, 'user', '');
});
