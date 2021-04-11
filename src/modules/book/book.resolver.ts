import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { FilterQuery, MikroORM } from '@mikro-orm/core'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@utils/guards'
import { User } from '@modules/user/user.entity'
import { LikeService } from '@modules/like/like.service'
import { UserService } from '@modules/user/user.service'
import { Loan } from '@modules/loan/loan.entity'
import { CurrentUser } from '@utils/decorators'
import { slugify } from '@utils/slugify'
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
@UseGuards(AuthGuard)
export class BookResolver {
  constructor(
    private readonly orm: MikroORM,
    private readonly bookService: BookService,
    private readonly userService: UserService,
    private readonly likeService: LikeService,
    private readonly bookLoader: BookLoader
  ) {}

  @Query(() => Book, { nullable: true })
  book(@Args() args: BookWhereUniqueInput): Promise<Book | null> {
    return this.bookService.getOne({ uuid: args.bookUuid })
  }

  @Query(() => BookConnection)
  async books(@Args() args: BooksInput): Promise<BookConnection> {
    const { search, onlyActive, userUuid } = args.where
    const searchFilters = (() => {
      if (!search) return null
      const slugifySearch = { $like: `%${slugify(search)}%` }
      return { $or: [{ titleSlug: slugifySearch }, { authorSlug: slugifySearch }] }
    })()
    const userFilters = await (async () => {
      if (!userUuid) return null
      const owner = await this.userService.getOneOrFail({ uuid: userUuid })
      return { owner }
    })()
    const statusFilters = onlyActive ? { status: BookStatus.Active } : null

    const where: FilterQuery<Book> = {
      ...statusFilters,
      ...userFilters,
      ...searchFilters,
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
  async updateBook(@Args() args: UpdateBookInput, @CurrentUser() user: User): Promise<Book> {
    const result = await this.orm.em.transactional(async (em) => {
      const where = { uuid: args.where.bookUuid }
      const book =
        args.data.status === BookStatus.Inactive
          ? await this.bookService.getOneAvailableOrFail(where, { em, populate: ['owner'] })
          : await this.bookService.getOneOrFail(where, { em, populate: ['owner'] })
      this.bookService.validateOwnership(book, user)
      const updatedBook = await this.bookService.update(book, args.data, { em })
      em.persist(updatedBook)
      return updatedBook
    })
    return result
  }

  @Mutation(() => Book)
  async likeBook(@Args() args: BookWhereUniqueInput, @CurrentUser() user: User): Promise<Book> {
    const result = await this.orm.em.transactional(async (em) => {
      const where = { uuid: args.bookUuid }
      const book = await this.bookService.getOneOrFail(where, { em })
      const like = await this.likeService.getOne({ book, user }, { em })
      if (like) await this.likeService.remove(like, { em })
      else {
        const newLike = await this.likeService.create({ book, user }, { em })
        em.persist(newLike)
      }
      return book
    })
    return result
  }

  @Mutation(() => Book)
  async removeBook(@Args() args: BookWhereUniqueInput, @CurrentUser() user: User): Promise<Book> {
    const result = await this.orm.em.transactional(async (em) => {
      const book = await this.bookService.getOneAvailableOrFail({ uuid: args.bookUuid }, { em })
      await this.bookService.validateOwnership(book, user)
      const removedBook = await this.bookService.remove(book, { em })
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

  @ResolveField('hasLiked', () => Boolean)
  resolveHasLiked(@Parent() book: Book, @CurrentUser() user: User): Promise<Boolean> {
    return this.bookLoader.hasLiked().load({ book, user })
  }

  @ResolveField('likeCount', () => Int)
  resolveLikeCount(@Parent() book: Book): Promise<number> {
    return this.bookLoader.likeCount().load(book)
  }

  @ResolveField('currentRequest', () => Loan, { nullable: true })
  resolveCurrentRequest(@Parent() book: Book, @CurrentUser() user: User): Promise<Loan | null> {
    return this.bookLoader.currentRequest().load({ book, user })
  }
}
