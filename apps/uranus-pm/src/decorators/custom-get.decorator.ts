import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CustomGet = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { query = {}, projection = {}, options = {} } = request.body;
    return { query, projection, options };
  }
)
