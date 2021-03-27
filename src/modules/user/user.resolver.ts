import { Query, Resolver } from '@nestjs/graphql'
import { DeepPartial } from '@utils/types'
import { User } from './user.entity'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  me(): DeepPartial<User> {
    return { username: 'gigilato', uuid: 'uuid' }
  }
}
