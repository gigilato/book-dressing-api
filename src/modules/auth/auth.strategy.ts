import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { BasicStrategy } from 'passport-http'
import { Strategy as CustomStrategy } from 'passport-custom'
import { User } from '@modules/user/user.entity'
import { LibrariesService } from '@libraries/libraries.service'
import { UserService } from '@modules/user/user.service'
import { AdminConfig, FirebaseConfig } from '@config'
import { Admin } from './auth.types'

@Injectable()
export class AuthBasicStrategy extends PassportStrategy(BasicStrategy, 'basic') {
  constructor(private readonly configService: ConfigService) {
    super(
      async (
        user: string,
        password: string,
        done: (error: any, user: Admin | null) => void
      ): Promise<void> => {
        const admin = this.configService.get<AdminConfig>('admin')
        const isAdminValid = admin?.user === user && admin?.password === password
        done(null, isAdminValid ? { user, password } : null)
      }
    )
  }
}

@Injectable()
export class AuthFirebaseStrategy extends PassportStrategy(CustomStrategy, 'firebase') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly libService: LibrariesService
  ) {
    super(
      async (req: Request, done: (error: any, user: User | null) => void): Promise<void> => {
        const firebaseConfig = this.configService.get<FirebaseConfig>('firebase')
        // @ts-ignore
        const authorization = req.headers.authorization as string
        const user = await (async () => {
          try {
            if (!authorization) return null
            const [scheme, idToken] = authorization!.split(' ')
            if (scheme !== firebaseConfig?.scheme) return null
            const decodedToken = await this.libService.firebase.authenticate(idToken)
            return this.userService.getOne({ firebaseId: decodedToken?.uid })
          } catch (e) {
            return null
          }
        })()
        done(null, user)
      }
    )
  }
}
