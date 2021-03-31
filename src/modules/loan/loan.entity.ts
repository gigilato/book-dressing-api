import { Entity, Enum, IdentifiedReference, ManyToOne, Property } from '@mikro-orm/core'
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { BaseEntity } from '@utils/entity'
import { User } from '@modules/user/user.entity'
import { Book } from '@modules/book/book.entity'

export enum LoanStatus {
  Request,
  Cancel,
  Active,
  Late,
  Finish,
}
registerEnumType(LoanStatus, { name: 'LoanStatus' })

@Entity()
@ObjectType()
export class Loan extends BaseEntity {
  @Enum()
  @Field(() => LoanStatus)
  status: LoanStatus = LoanStatus.Request

  @Property({ nullable: true })
  @Field(() => Date, { nullable: true })
  finishedAt?: Date

  @Property({ nullable: true })
  notifiedAt?: Date

  @ManyToOne(() => User, { wrappedReference: true })
  user!: IdentifiedReference<User>

  @ManyToOne(() => Book, { wrappedReference: true })
  book!: IdentifiedReference<Book>
}
