import { Index, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 } from 'uuid'

export class BaseEntity {
  @PrimaryKey()
  id!: number

  @Property()
  @Index()
  uuid: string = v4()

  @Property()
  createdAt: Date = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date()
}
