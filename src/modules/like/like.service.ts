import { Injectable } from '@nestjs/common'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { BaseService } from '../../utils/entity'
import { Like } from './like.entity'

@Injectable()
export class LikeService extends BaseService(Like) {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: EntityRepository<Like>
  ) {
    super(likeRepository)
  }
}
