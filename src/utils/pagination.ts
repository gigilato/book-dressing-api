import { Field, ObjectType, Int, ArgsType } from '@nestjs/graphql'
import { Type } from '@nestjs/common'
import { BaseEntity } from './entity'

export const Connection = <T extends BaseEntity>(classRef: Type<T>, service?: boolean) => {
  @ObjectType(`${classRef.name}${service ? 'Service' : ''}Edge`)
  abstract class EdgeType {
    @Field(() => Int)
    cursor!: number
    @Field(() => classRef)
    node!: T
  }

  @ObjectType(`${classRef.name}${service ? 'Service' : ''}Aggregate`)
  abstract class AggregateType {
    @Field(() => Int)
    count!: number
  }

  @ObjectType(`${classRef.name}${service ? 'Service' : ''}PageInfos`)
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

@ArgsType()
export class BaseConnectionInput {
  @Field(() => Int, { nullable: true })
  limit?: number
  @Field(() => Int, { nullable: true })
  offset?: number
}
