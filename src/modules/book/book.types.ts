import { ArgsType, Field, ID, InputType, ObjectType } from '@nestjs/graphql'
import { BaseConnectionInput, Connection } from '@utils/pagination'
import { Book, BookStatus } from './book.entity'

@ObjectType()
export class BookConnection extends Connection(Book) {}

@InputType()
@ArgsType()
export class BookWhereUniqueInput {
  @Field(() => ID)
  bookUuid!: string
}

@InputType()
export class BooksWhereInput {
  @Field({ nullable: true })
  search?: string
  @Field()
  onlyActive!: boolean
  @Field(() => ID, { nullable: true })
  userUuid?: string
}

@ArgsType()
export class BooksInput extends BaseConnectionInput {
  @Field(() => BooksWhereInput)
  where!: BooksWhereInput
}

@ArgsType()
export class CreateBookInput {
  @Field(() => ID, { nullable: true })
  uuid?: string
  @Field({ nullable: true })
  isbn?: string
  @Field()
  title!: string
  @Field()
  author!: string
  @Field()
  description!: string
  @Field({ nullable: true })
  pictureUrl?: string
}

@InputType()
class UpdateBookDataInput {
  @Field({ nullable: true })
  isbn?: string
  @Field({ nullable: true })
  title?: string
  @Field({ nullable: true })
  author?: string
  @Field({ nullable: true })
  description?: string
  @Field({ nullable: true })
  pictureUrl?: string
  @Field(() => BookStatus, { nullable: true })
  status?: BookStatus
}

@ArgsType()
export class UpdateBookInput {
  @Field()
  where!: BookWhereUniqueInput
  @Field(() => UpdateBookDataInput)
  data!: UpdateBookDataInput
}
