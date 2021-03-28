import { EntityManager, EntityRepository, Index, PrimaryKey, Property } from '@mikro-orm/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { Injectable, Type } from '@nestjs/common'
import { v4 } from 'uuid'
import { EntityData, FilterQuery } from '@mikro-orm/core/typings'
import { ServiceMethodOptions } from './types'
import { Connection } from './pagination'

@ObjectType()
export class BaseEntity {
  @PrimaryKey()
  id!: number

  @Property()
  @Index()
  @Field()
  uuid: string = v4()

  @Property()
  @Field(() => Date)
  createdAt: Date = new Date()

  @Property({ onUpdate: () => new Date() })
  @Field(() => Date)
  updatedAt: Date = new Date()
}

export const BaseService = <T extends BaseEntity>(classRef: Type<T>) => {
  class EntityConnection extends Connection(classRef) {}

  @Injectable()
  class BaseServiceType {
    constructor(private readonly repository: EntityRepository<T>) {}

    getRepository(em?: EntityManager): EntityRepository<T> {
      return em?.getRepository(classRef) ?? this.repository
    }

    getOne(where: FilterQuery<T>, options?: ServiceMethodOptions): Promise<T | null> {
      const repo = this.getRepository(options?.em)
      return repo.findOne(where, options?.populate, options?.orderBy)
    }

    getOneOrFail(where: FilterQuery<T>, options?: ServiceMethodOptions): Promise<T> {
      const repo = this.getRepository(options?.em)
      return repo.findOneOrFail(where, options?.populate, options?.orderBy)
    }

    getAll(where: FilterQuery<T>, options?: ServiceMethodOptions): Promise<T[]> {
      const repo = this.getRepository(options?.em)
      return repo.find(where, options?.populate, options?.orderBy, options?.limit, options?.offset)
    }

    async getConnection(
      where: FilterQuery<T>,
      options?: ServiceMethodOptions
    ): Promise<EntityConnection> {
      const repo = this.getRepository(options?.em)
      const offset = options?.offset ?? 0
      const [entities, count] = await repo.findAndCount(
        where,
        options?.populate,
        options?.orderBy,
        options?.limit,
        offset
      )

      const hasNextPage = entities.length + offset >= count
      const connection: EntityConnection = {
        pageInfos: { hasNextPage },
        aggregate: { count },
        edges: entities.map((node, cursor) => ({ cursor, node })),
      }
      return connection
    }

    async create(data: EntityData<T>, options?: ServiceMethodOptions): Promise<T> {
      const repo = this.getRepository(options?.em)
      const entity = repo.create(data)
      if (!options?.em) await repo.persistAndFlush(entity)
      return entity
    }

    async update(entity: T, data: EntityData<T>, options?: ServiceMethodOptions): Promise<T> {
      const repo = this.getRepository(options?.em)
      const updatedEntity = repo.assign(entity, data)
      if (!options?.em) await repo.persistAndFlush(updatedEntity)
      return updatedEntity
    }

    async remove(entity: T, options?: ServiceMethodOptions): Promise<T> {
      const repo = this.getRepository(options?.em)
      repo.remove(entity)
      if (!options?.em) await repo.flush()
      return entity
    }
  }
  return BaseServiceType
}
