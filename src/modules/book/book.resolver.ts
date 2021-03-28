import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { FilterQuery, MikroORM } from '@mikro-orm/core'
import { User } from '@modules/user/user.entity'
import { UserService } from '@modules/user/user.service'
import { slugify } from '@utils/slugify'
import { CurrentUser } from '@utils/decorators'
import { Book, BookStatus } from './book.entity'
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
    private readonly userService: UserService,
    private readonly bookLoader: BookLoader
  ) {}

  @Query(() => Book)
  book(@Args() args: BookWhereUniqueInput): Promise<Book> {
    return this.bookService.getOneOrFail({ uuid: args.bookUuid })
  }

  @Query(() => BookConnection)
  async books(@Args({ nullable: true }) args?: BooksInput): Promise<BookConnection> {
    let where: FilterQuery<Book> = {}
    if (args?.where?.search) {
      const search = { $like: slugify(args?.where?.search) }
      where = { $or: [{ titleSlug: search }, { authorSlug: search }] }
    }
    if (args?.where?.userUuid) {
      const owner = await this.userService.getOneOrFail({ uuid: args?.where?.userUuid })
      where = { ...where, owner }
    }
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
  async updateBook(@Args() args: UpdateBookInput): Promise<Book> {
    const result = await this.orm.em.transactional(async (em) => {
      const where = { uuid: args.where.bookUuid }
      const book =
        args.data.status === BookStatus.Inactive
          ? await this.bookService.getOneAvailableOrFail(where, { em })
          : await this.bookService.getOneOrFail(where, { em })
      const updatedBook = await this.bookService.update(book, args.data, { em })
      em.persist(updatedBook)
      return updatedBook
    })
    return result
  }

  @Mutation(() => Book)
  async removeBook(@Args() args: BookWhereUniqueInput): Promise<Book> {
    const result = await this.orm.em.transactional(async (em) => {
      const book = await this.bookService.getOneAvailableOrFail({ uuid: args.bookUuid }, { em })
      const removedBook = await this.bookService.remove(book, { em })
      em.persist(removedBook)
      return removedBook
    })
    return result
  }

  @ResolveField('owner', () => User)
  resolveOwner(@Parent() book: Book): Promise<User> {
    return this.bookLoader.owner().load(book)
  }
  @ResolveField('available', () => Boolean)
  resolveAvailable(@Parent() book: Book): Promise<Boolean> {
    return this.bookLoader.available().load(book)
  }
}
