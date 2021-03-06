import { Entity, Enum, IdentifiedReference, ManyToOne, Property } from '@mikro-orm/core'
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { BaseEntity } from '../../utils/entity'
import { User } from '../user/user.entity'
import { Book } from '../book/book.entity'

export enum LoanStatus {
  Request = 'Request',
  Active = 'Active',
  Finish = 'Finish',
}
registerEnumType(LoanStatus, { name: 'LoanStatus' })

@Entity()
@ObjectType()
export class Loan extends BaseEntity {
  @Enum(() => LoanStatus)
  @Field(() => LoanStatus)
  status: LoanStatus = LoanStatus.Request

  @Property({ nullable: true })
  @Field(() => Date, { nullable: true })
  finishedAt?: Date

  @Property({ nullable: true })
  notifiedAt?: Date

  @ManyToOne(() => User, { wrappedReference: true, onDelete: 'cascade' })
  user!: IdentifiedReference<User>

  @ManyToOne(() => Book, { wrappedReference: true, onDelete: 'cascade' })
  book!: IdentifiedReference<Book>
}
