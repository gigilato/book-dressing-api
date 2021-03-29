import { MikroORM } from '@mikro-orm/core'
import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AdminGuard } from '@utils/guards'
import { UserService } from './user.service'
import { CreateUserInput } from './user.types'

@Controller('user')
@UseGuards(AdminGuard)
export class UserController {
  constructor(private readonly orm: MikroORM, private readonly userService: UserService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async signInWithPipedriveApp(@Body() data: CreateUserInput) {
    const result = await this.orm.em.transactional(async (em) => {
      const { email, firebaseId } = data
      const existingUser = await this.userService.getOne({ email }, { em })
      if (existingUser) throw new HttpException('Conflict', HttpStatus.CONFLICT)

      const user = await this.userService.create(
        { email, firebaseId, username: `user${firebaseId}` },
        { em }
      )
      em.persist(user)
      return user
    })
    return result
  }
}
