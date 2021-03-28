import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { FilterQuery, MikroORM } from '@mikro-orm/core'
import { User } from '@modules/user/user.entity'
import { slugify } from '@utils/slugify'
import { CurrentBook, CurrentUser, TargetUser } from '@utils/decorators'
import { Book } from './book.entity'
import { BookService } from './book.service'
import {
  BookConnection,
  BooksInput,
  BookWhereUniqueInput,
  CreateBookInput,
  UpdateBookInput,
} from './book.types'
import { BookLoader } from './book.loader'

@Resolver(() => Book)
export class BookResolver {
  constructor(
    private readonly orm: MikroORM,
    private readonly bookService: BookService,
    private readonly bookLoader: BookLoader
  ) {}

  @Query(() => Book)
  book(@Args() args: BookWhereUniqueInput, @CurrentBook() book: Book): Book {
    return book
  }

  @Query(() => BookConnection)
  books(
    @Args({ nullable: true }) args?: BooksInput,
    @TargetUser() owner?: User
  ): Promise<BookConnection> {
    let where: FilterQuery<Book> = {}
    if (args?.where?.search) {
      const search = { $like: slugify(args?.where?.search) }
      where = { ...where, $or: [{ titleSlug: { $like: search } }, { authorSlug: search }] }
    }
    if (owner) where = { ...where, owner }
    return this.bookService.getConnection(where, {
      limit: args?.limit,
      offset: args?.offset,
      orderBy: { createdAt: 'DESC' },
    })
  }

  @Mutation(() => Book)
  async createBook(@Args() args: CreateBookInput, @CurrentUser() owner: User): Promise<Book> {
    return this.bookService.create({ ...args, owner })
  }

  @Mutation(() => Book)
  updateBook(@Args() args: UpdateBookInput, @CurrentBook() book: Book): Promise<Book> {
    return this.bookService.update(book, args.data)
  }

  @Mutation(() => Book)
  removeBook(@Args() args: BookWhereUniqueInput, @CurrentBook() book: Book): Promise<Book> {
    return this.bookService.remove(book)
  }

  @ResolveField('owner', () => User)
  resolveOwner(@Parent() book: Book): Promise<User> {
    return this.bookLoader.owner().load(book)
  }
  @ResolveField('available', () => Boolean)
  resolveAvailable(): Boolean {
    return true
  }
}
