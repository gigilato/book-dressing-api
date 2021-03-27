import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core'
import { BaseEntity } from '@utils/entity'
import { User } from '@modules/user/user.entity'
import { Book } from '@modules/book/book.entity'

export enum LoanStatus {
  Start = 'Start',
  Cancel = 'Cancel',
  Active = 'Active',
  Late = 'Late',
  Finish = 'Finish',
}

@Entity()
export class Loan extends BaseEntity {
  @Enum()
  status: LoanStatus = LoanStatus.Start

  @Property()
  finishedAt?: Date

  @Property()
  notifiedAt?: Date

  @ManyToOne(() => User)
  user!: User

  @ManyToOne(() => Book)
  book!: Book
}
