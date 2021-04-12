import { EntityManager, EntityRepository, PrimaryKey, Property, Unique } from '@mikro-orm/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { Injectable, Type } from '@nestjs/common'
import { v4 } from 'uuid'
import { EntityData, FilterQuery } from '@mikro-orm/core/typings'
import { ServiceMethodOptions } from './types'
import { NotFoundError } from './errors'
import { IConnection } from './pagination'

@ObjectType()
export class BaseEntity {
  @PrimaryKey()
  id!: number

  @Property()
  @Unique()
  @Field()
  uuid: string = v4()

  @Property()
  @Field(() => Date)
  createdAt: Date = new Date()

  @Property({ onUpdate: () => new Date() })
  @Field(() => Date)
  updatedAt: Date = new Date()
}

export const BaseService = <T>(classRef: Type<T>) => {
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

    async getOneOrFail(where: FilterQuery<T>, options?: ServiceMethodOptions): Promise<T> {
      const repo = this.getRepository(options?.em)
      try {
        return repo.findOneOrFail(where, options?.populate, options?.orderBy)
      } catch (e) {
        throw new NotFoundError()
      }
    }

    getAll(where: FilterQuery<T>, options?: ServiceMethodOptions): Promise<T[]> {
      const repo = this.getRepository(options?.em)
      return repo.find(where, options?.populate, options?.orderBy, options?.limit, options?.offset)
    }

    async getConnection(
      where: FilterQuery<T>,
      options?: ServiceMethodOptions
    ): Promise<IConnection<T>> {
      const repo = this.getRepository(options?.em)
      const offset = options?.offset ?? 0
      const [entities, count] = await repo.findAndCount(
        where,
        options?.populate,
        options?.orderBy,
        options?.limit,
        offset
      )

      const hasNextPage = entities.length + offset < count
      const connection: IConnection<T> = {
        pageInfos: { hasNextPage },
        aggregate: { count },
        edges: entities.map((node, cursor) => ({ cursor, node })),
      }
      return connection
    }

    getCount(where: FilterQuery<T>, options?: ServiceMethodOptions) {
      const repo = this.getRepository(options?.em)
      return repo.count(where)
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

    async populate(entity: T, options?: ServiceMethodOptions) {
      const repo = this.getRepository(options?.em)
      const populatedEntity = await repo.populate(entity, options?.populate)
      return populatedEntity
    }
  }
  return BaseServiceType
}
