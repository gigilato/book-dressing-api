import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { MikroORM } from '@mikro-orm/core'
import { CurrentUser } from '@utils/decorators'
import { ExistError } from '@utils/errors'
import { User } from './user.entity'
import { UserService } from './user.service'
import { UpdateProfileInput } from './user.types'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly orm: MikroORM, private readonly userService: UserService) {}

  @Query(() => User)
  me(@CurrentUser() user: User): User {
    return user
  }

  @Mutation(() => User)
  async updateProfile(@CurrentUser() user: User, @Args() args: UpdateProfileInput): Promise<User> {
    const { username } = args
    const result = await this.orm.em.transactional(async (em) => {
      if (username) {
        const existingUser = await this.userService.getOne({ username }, { em })
        if (existingUser) throw new ExistError('user')
      }
      const updatedUser = await this.userService.update(user, args, { em })
      em.persist(user)
      return updatedUser
    })
    return result
  }
}
