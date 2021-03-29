import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AdminConfig } from '@config'

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  isAdminValid(user: string, password: string) {
    const admin = this.configService.get<AdminConfig>('admin')
    return admin?.user === user && admin?.password === password
  }
}
