import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '@modules/user/user.module'
import { AuthBasicStrategy, AuthFirebaseStrategy } from './auth.strategy'

@Module({
  imports: [PassportModule.register({ defaultStrategy: ['basic', 'firebase'] }), UserModule],
  providers: [AuthBasicStrategy, AuthFirebaseStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
