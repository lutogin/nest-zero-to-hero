import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { get } from 'lodash';

export const GetUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return get(request, 'user.id', null);
  },
);
