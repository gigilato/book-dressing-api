import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { User } from '@modules/user/user.entity'

export interface GqlRequestWithContext {
  req: {
    user: User
  } & Request
}

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context)
  return ctx.getContext<GqlRequestWithContext>().req.user
})
