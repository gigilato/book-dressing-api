import { Injectable } from '@nestjs/common'
import { AuthGuard as PassportGuard } from '@nestjs/passport'

@Injectable()
export class AdminGuard extends PassportGuard('basic') {}
