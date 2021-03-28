import { Field, ObjectType, Int } from '@nestjs/graphql'
import { Type } from '@nestjs/common'
import { BaseEntity } from './entity'

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
  abstract class ConnectionType {
    @Field(() => [EdgeType], { nullable: true })
    edges!: EdgeType[]
    @Field(() => AggregateType)
    aggregate!: AggregateType
    @Field(() => PageInfosType)
    pageInfos!: PageInfosType
  }

  return ConnectionType
}
