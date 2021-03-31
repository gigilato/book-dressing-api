import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard as PassportGuard } from '@nestjs/passport'
import { GqlRequestWithContext } from '@utils/types'

@Injectable()
export class AdminGuard extends PassportGuard('basic') {}

@Injectable()
export class AuthGuard extends PassportGuard('firebase') {
  constructor(private reflector: Reflector) {
    super()
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext<GqlRequestWithContext>().req
  }

  async canActivate(context: ExecutionContext) {
    try {
      await super.canActivate(context)
    } catch (e) {
      throw e
    }
    return true
  }
}
