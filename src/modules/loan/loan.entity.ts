import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core'
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { BaseEntity } from '@utils/entity'
import { User } from '@modules/user/user.entity'
import { Book } from '@modules/book/book.entity'

export enum LoanStatus {
  Request = 'Request',
  Cancel = 'Cancel',
  Active = 'Active',
  Late = 'Late',
  Finish = 'Finish',
}
registerEnumType(LoanStatus, { name: 'LoanStatus' })

@Entity()
@ObjectType()
export class Loan extends BaseEntity {
  @Enum()
  @Field(() => LoanStatus)
  status: LoanStatus = LoanStatus.Request

  @Property()
  @Field(() => Date)
  finishedAt?: Date

  @Property()
  notifiedAt?: Date

  @ManyToOne(() => User)
  user!: User

  @ManyToOne(() => Book)
  book!: Book
}
