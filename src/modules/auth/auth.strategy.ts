import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { BasicStrategy as DefaultBasicStrategy } from 'passport-http'
import { Admin } from './auth.types'
import { AuthService } from './auth.service'

@Injectable()
export class AuthBasicStrategy extends PassportStrategy(DefaultBasicStrategy, 'basic') {
  constructor(private readonly authService: AuthService) {
    super(
      async (
        user: string,
        password: string,
        done: (error: any, user: Admin | null) => void
      ): Promise<void> => {
        const isAdminValid = authService.isAdminValid(user, password)
        done(null, isAdminValid ? { user, password } : null)
      }
    )
  }
}
