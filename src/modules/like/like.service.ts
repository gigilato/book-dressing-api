import { Injectable } from '@nestjs/common'
import { EntityData, EntityManager, EntityRepository, FilterQuery } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { ServiceMethodOptions } from '@utils/types'
import { Like } from './like.entity'

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: EntityRepository<Like>
  ) {}

  getRepository(em?: EntityManager): EntityRepository<Like> {
    return em?.getRepository(Like) ?? this.likeRepository
  }

  getOne(where: FilterQuery<Like>, options?: ServiceMethodOptions): Promise<Like | null> {
    const repo = this.getRepository(options?.em)
    return repo.findOne(where)
  }

  getCount(where: FilterQuery<Like>, options?: ServiceMethodOptions) {
    const repo = this.getRepository(options?.em)
    return repo.count(where)
  }

  getOneOrFail(where: FilterQuery<Like>, options?: ServiceMethodOptions): Promise<Like | null> {
    const repo = this.getRepository(options?.em)
    return repo.findOne(where)
  }

  async create(data: EntityData<Like>, options?: ServiceMethodOptions): Promise<Like> {
    const repo = this.getRepository(options?.em)
    const entity = repo.create(data)
    if (!options?.em) await repo.persistAndFlush(entity)
    return entity
  }

  async remove(entity: Like, options?: ServiceMethodOptions): Promise<Like> {
    const repo = this.getRepository(options?.em)
    repo.remove(entity)
    if (!options?.em) await repo.flush()
    return entity
  }
}
