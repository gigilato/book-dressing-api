import { Collection, Entity, Index, OneToMany, Property } from '@mikro-orm/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from '@utils/entity'
import { Book } from '@modules/book/book.entity'
import { Loan } from '@modules/loan/loan.entity'

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Property()
  @Index()
  @Field()
  firebaseId!: string

  @Property()
  @Index()
  @Field()
  email!: string

  @Property()
  @Index()
  @Field()
  username!: string

  @Property({ nullable: true })
  @Field({ nullable: true })
  firstname?: string

  @Property({ nullable: true })
  @Field({ nullable: true })
  lastname?: string

  @Property({ nullable: true })
  @Field({ nullable: true })
  pictureUrl?: string

  @OneToMany(() => Book, (book) => book.owner)
  books = new Collection<Book>(this)

  @OneToMany(() => Loan, (loan) => loan.user)
  loans = new Collection<Loan>(this)
}
