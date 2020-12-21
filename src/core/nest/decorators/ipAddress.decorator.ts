import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const IpAddress = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { ip } = ctx.switchToHttp().getRequest();
    return ip;
  },
);
