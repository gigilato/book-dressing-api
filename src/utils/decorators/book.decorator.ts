import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { GqlRequestWithContext } from '@utils/types'

export const CurrentBook = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context)
  return ctx.getContext<GqlRequestWithContext>().req.book
})
