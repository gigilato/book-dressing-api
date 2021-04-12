import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { MikroORM } from '@mikro-orm/core'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '../../utils/guards'
import { CurrentUser } from '../../utils/decorators'
import { ExistError } from '../../utils/errors'
import { User } from './user.entity'
import { UserService } from './user.service'
import { UpdateProfileInput } from './user.types'
import { UserLoader } from './user.loader'

@Resolver(() => User)
@UseGuards(AuthGuard)
export class UserResolver {
  constructor(
    private readonly orm: MikroORM,
    private readonly userService: UserService,
    private readonly userLoader: UserLoader
  ) {}

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
        if (existingUser) throw new ExistError()
      }
      const updatedUser = await this.userService.update(user, args, { em })
      em.persist(updatedUser)
      return updatedUser
    })
    return result
  }

  @ResolveField('bookCount', () => Int)
  resolveBookCount(@Parent() user: User): Promise<number> {
    return this.userLoader.bookCount().load(user)
  }
}
