import { Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { DeepPartial } from '@utils/types'
import { User } from '@modules/user/user.entity'
import { Book } from './book.entity'
import { BookService } from './book.service'

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book])
  books(): DeepPartial<Book[]> {
    return [{ uuid: 'uuid' }]
  }

  @Query(() => [Book])
  myBooks(): DeepPartial<Book[]> {
    return [{ uuid: 'uuid' }]
  }

  @Query(() => [Book])
  userBooks(): DeepPartial<Book[]> {
    return [{ uuid: 'uuid' }]
  }

  @Mutation(() => Book)
  createBook(): DeepPartial<Book> {
    return { uuid: 'uuid' }
  }

  @Mutation(() => Book)
  updateBook(): DeepPartial<Book> {
    return { uuid: 'uuid' }
  }

  @Mutation(() => Book)
  removeBook(): DeepPartial<Book> {
    return { uuid: 'uuid' }
  }

  @ResolveField('owner', () => User)
  resolveOwner(@Parent() book: Book): DeepPartial<User> {
    return { uuid: book.uuid }
  }
  @ResolveField('available', () => Boolean)
  resolveAvailable(): Boolean {
    return true
  }
}
