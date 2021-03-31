import { MikroORM } from '@mikro-orm/core'
import {
  Body,
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AdminGuard } from '@utils/guards'
import { UserService } from './user.service'
import { CreateUserInput } from './user.types'

@Controller('users')
@UseGuards(AdminGuard)
export class UserController {
  constructor(private readonly orm: MikroORM, private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() data: CreateUserInput) {
    const result = await this.orm.em.transactional(async (em) => {
      const { email, firebaseId } = data
      const existingUser = await this.userService.getOne({ email }, { em })
      if (existingUser) throw new ConflictException()

      const user = await this.userService.create(
        { email, firebaseId, username: `user${firebaseId}` },
        { em }
      )
      em.persist(user)
      return user
    })
    return result
  }

  @Delete(':firebaseId')
  @HttpCode(HttpStatus.OK)
  async removeUser(@Param('firebaseId') firebaseId: string) {
    console.log('salut')
    console.log(firebaseId)
    await this.orm.em.transactional(async (em) => {
      const existingUser = await this.userService.getOne({ firebaseId }, { em })
      if (!existingUser) throw new NotFoundException()

      await this.userService.remove(existingUser, { em })
    })
    return 'done'
  }
}
