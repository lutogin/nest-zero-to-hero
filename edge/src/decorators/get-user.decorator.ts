import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { get } from 'lodash';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return get(request, 'user');
  },
);
