import { Injectable } from '@nestjs/common'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { BaseService } from '../../utils/entity'
import { User } from './user.entity'

@Injectable()
export class UserService extends BaseService(User) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>
  ) {
    super(userRepository)
  }
}
