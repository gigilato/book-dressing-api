import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { AuthBasicStrategy } from './auth.strategy'

@Module({
  imports: [PassportModule.register({ defaultStrategy: ['basic'] })],
  providers: [AuthService, AuthBasicStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
