import { Collection, Entity, Index, OneToMany, Property } from '@mikro-orm/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from '../../utils/entity'
import { Book } from '../book/book.entity'
import { Loan } from '../loan/loan.entity'
import { Like } from '../like/like.entity'

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Property()
  @Index()
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
  name?: string

  @Property({ type: 'text', nullable: true })
  @Field({ nullable: true })
  description?: string

  @Property({ type: 'text', nullable: true })
  @Field({ nullable: true })
  pictureUrl?: string

  @OneToMany(() => Book, (book) => book.owner)
  books = new Collection<Book>(this)

  @OneToMany(() => Loan, (loan) => loan.user)
  loans = new Collection<Loan>(this)

  @OneToMany(() => Like, (like) => like.user)
  likes = new Collection<Like>(this)
}
