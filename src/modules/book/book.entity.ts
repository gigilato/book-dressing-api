import { Field, ObjectType } from '@nestjs/graphql'
import { Collection, Entity, Index, ManyToOne, OneToMany, Property } from '@mikro-orm/core'
import { BaseEntity } from '@utils/entity'
import { slugify } from '@utils/slugify'
import { User } from '@modules/user/user.entity'
import { Loan } from '@modules/loan/loan.entity'

const slugifyTitle = (entity: Book) => slugify(entity.title)
const slugifyAuthor = (entity: Book) => slugify(entity.author)

@Entity()
@ObjectType()
export class Book extends BaseEntity {
  @Property()
  @Field()
  isbn!: string

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

  @Property({ nullable: true })
  @Field({ nullable: true })
  pictureUrl?: string

  @ManyToOne(() => User)
  owner!: User

  @OneToMany(() => Loan, (loan) => loan.book)
  loans = new Collection<Loan>(this)
}
