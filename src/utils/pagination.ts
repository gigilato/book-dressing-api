import { Field, ObjectType, Int, ArgsType } from '@nestjs/graphql'
import { Type } from '@nestjs/common'
import { BaseEntity } from './entity'

export interface IConnection<T> {
  edges: { cursor: number; node: T }[]
  aggregate: { count: number }
  pageInfos: { hasNextPage: boolean }
}

export const Connection = <T extends BaseEntity>(classRef: Type<T>) => {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field(() => Int)
    cursor!: number
    @Field(() => classRef)
    node!: T
  }

  @ObjectType(`${classRef.name}Aggregate`)
  abstract class AggregateType {
    @Field(() => Int)
    count!: number
  }

  @ObjectType(`${classRef.name}PageInfos`)
  abstract class PageInfosType {
    @Field(() => Boolean)
    hasNextPage!: boolean
  }

  @ObjectType({ isAbstract: true })
  abstract class ConnectionType implements IConnection<T> {
    @Field(() => [EdgeType])
    edges!: EdgeType[]
    @Field(() => AggregateType)
    aggregate!: AggregateType
    @Field(() => PageInfosType)
    pageInfos!: PageInfosType
  }

  return ConnectionType
}

@ArgsType()
export class BaseConnectionInput {
  @Field(() => Int, { nullable: true })
  limit?: number
  @Field(() => Int, { nullable: true })
  offset?: number
}
