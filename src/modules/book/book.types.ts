import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql'
import { BaseConnectionInput, Connection } from '@utils/pagination'
import { Book } from './book.entity'

@ObjectType()
export class BookConnection extends Connection(Book) {}

@InputType()
@ArgsType()
export class BookWhereUniqueInput {
  @Field()
  bookUuid!: string
}

@InputType()
export class BooksWhereInput {
  @Field({ nullable: true })
  search?: string
  @Field({ nullable: true })
  userUuid?: string
}

@ArgsType()
export class BooksInput extends BaseConnectionInput {
  @Field(() => BooksWhereInput, { nullable: true })
  where?: BooksWhereInput
}

@ArgsType()
export class CreateBookInput {
  @Field()
  isbn!: string
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
}

@ArgsType()
export class UpdateBookInput {
  @Field()
  where!: BookWhereUniqueInput
  @Field(() => UpdateBookDataInput)
  data!: UpdateBookDataInput
}
