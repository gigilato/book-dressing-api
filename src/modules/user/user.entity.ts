import { Collection, Entity, Index, OneToMany, Property } from '@mikro-orm/core'
import { BaseEntity } from '@utils/entity'
import { Book } from '@modules/book/book.entity'
import { Loan } from '@modules/loan/loan.entity'

@Entity()
export class User extends BaseEntity {
  @Property()
  firstname?: string

  @Property()
  lastname?: string

  @Property()
  @Index()
  username!: string

  @Property({ nullable: true })
  pictureUrl?: string

  @Property()
  @Index()
  email!: string

  @OneToMany(() => Book, (book) => book.owner)
  books = new Collection<Book>(this)

  @OneToMany(() => Loan, (loan) => loan.user)
  loans = new Collection<Loan>(this)
}
