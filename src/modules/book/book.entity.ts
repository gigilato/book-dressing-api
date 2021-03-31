import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import {
  Collection,
  Entity,
  Enum,
  Index,
  ManyToOne,
  OneToMany,
  Property,
  IdentifiedReference,
} from '@mikro-orm/core'
import { BaseEntity } from '@utils/entity'
import { slugify } from '@utils/slugify'
import { User } from '@modules/user/user.entity'
import { Loan } from '@modules/loan/loan.entity'

const slugifyTitle = (entity: Book) => slugify(entity.title)
const slugifyAuthor = (entity: Book) => slugify(entity.author)

export enum BookStatus {
  Active,
  Inactive,
}
registerEnumType(BookStatus, { name: 'BookStatus' })

@Entity()
@ObjectType()
export class Book extends BaseEntity {
  @Property({ nullable: true })
  isbn?: string

  @Property()
  @Field()
  title!: string

  @Property({ onCreate: slugifyTitle, onUpdate: slugifyTitle })
  @Index()
  titleSlug!: string

  @Property()
  @Field()
  author!: string

  @Property({ onCreate: slugifyAuthor, onUpdate: slugifyAuthor })
  @Index()
  authorSlug!: string

  @Property()
  @Field()
  description!: string

  @Enum()
  @Field(() => BookStatus)
  status: BookStatus = BookStatus.Active

  @Property({ nullable: true })
  @Field({ nullable: true })
  pictureUrl?: string

  @ManyToOne(() => User, { wrappedReference: true })
  owner!: IdentifiedReference<User>

  @OneToMany(() => Loan, (loan) => loan.book)
  loans = new Collection<Loan>(this)
}
