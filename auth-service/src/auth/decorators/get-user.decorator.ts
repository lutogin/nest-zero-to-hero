import { createParamDecorator } from '@nestjs/common';
import { get } from 'lodash';
import { User } from '../../users/user.entity';

export const GetUser = createParamDecorator((data, req): User => {
  return get(req, 'user', '');
});
