import { Entity, ManyToOne, Property, IdentifiedReference, PrimaryKeyType } from '@mikro-orm/core'
import { User } from '../user/user.entity'
import { Book } from '../book/book.entity'

@Entity()
export class Like {
  [PrimaryKeyType]: [number, number]

  @ManyToOne(() => User, { primary: true, wrappedReference: true, onDelete: 'cascade' })
  user!: IdentifiedReference<User>

  @ManyToOne(() => Book, { primary: true, wrappedReference: true, onDelete: 'cascade' })
  book!: IdentifiedReference<Book>

  @Property()
  createdAt: Date = new Date()
}
