import { Index, PrimaryKey, Property } from '@mikro-orm/core'
import { Field } from '@nestjs/graphql'
import { v4 } from 'uuid'

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
