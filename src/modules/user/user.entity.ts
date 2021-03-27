import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 } from 'uuid'

export enum UserStatus {
  Active = 'Active',
  Deleted = 'Deleted',
}

@Entity()
export class User {
  @PrimaryKey()
  id!: number

  @Property()
  uuid: string = v4()

  @Property()
  firstName = ''

  @Property()
  lastName = ''

  @Enum(() => UserStatus)
  status!: UserStatus

  @Property({ nullable: true })
  pictureUrl?: string

  @Property()
  email!: string

  /*********************************** relations ***********************************/
}
