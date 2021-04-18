import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { MikroORM } from '@mikro-orm/core'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '../../utils/guards'
import { CurrentUser } from '../../utils/decorators'
import { ExistError, ValidationError } from '../../utils/errors'
import { Book } from '../book/book.entity'
import { User } from '../user/user.entity'
import { BookService } from '../book/book.service'
import { Loan, LoanStatus } from './loan.entity'
import { LoanService } from './loan.service'
import { CreateLoanInput, LoanConnection, LoansInput, LoanWhereUniqueInput } from './loan.types'
import { LoanLoader } from './loan.loader'
import { UserService } from '../user/user.service'

@Resolver(() => Loan)
@UseGuards(AuthGuard)
export class LoanResolver {
  constructor(
    private readonly orm: MikroORM,
    private readonly loanService: LoanService,
    private readonly bookService: BookService,
    private readonly userService: UserService,
    private readonly loanLoader: LoanLoader
  ) {}

  @Query(() => LoanConnection)
  async loans(@Args() args: LoansInput): Promise<LoanConnection> {
    const { userUuid, ownerUuid } = args.where
    if ((!userUuid && !ownerUuid) || (userUuid && ownerUuid)) throw new ValidationError()
    const where = await (async () => {
      if (userUuid) {
        const user = await this.userService.getOneOrFail({ uuid: userUuid })
        return { user }
      }
      const owner = await this.userService.getOneOrFail({ uuid: ownerUuid })
      return { book: { owner } }
    })()
    return this.loanService.getConnection(where, { limit: args?.limit, offset: args?.offset })
  }

  @Mutation(() => Loan)
  async requestLoan(@Args() args: CreateLoanInput, @CurrentUser() user: User): Promise<Loan> {
    const result = await this.orm.em.transactional(async (em) => {
      const book = await this.bookService.getOneAvailableOrFail(
        { uuid: args.bookUuid },
        { em, populate: ['owner'] }
      )
      const owner = await book.owner.load()
      if (owner.id === user.id) throw new ValidationError()
      const currentRequest = await this.loanService.getCurrentRequest(book, user, { em })
      if (currentRequest) throw new ExistError()
      const loan = await this.loanService.create({ book, user })
      em.persist(loan)
      return loan
    })
    return result
  }

  @Mutation(() => Loan)
  async acceptLoan(@Args() args: LoanWhereUniqueInput, @CurrentUser() user: User): Promise<Loan> {
    const result = await this.orm.em.transactional(async (em) => {
      const loan = await this.loanService.getOneOrFail(
        { uuid: args.loanUuid },
        { em, populate: ['book.owner'] }
      )
      const book = await loan.book.load()
      const owner = await book.owner.load()
      if (loan.status !== LoanStatus.Request || owner.id !== user.id) throw new ValidationError()
      if (!this.bookService.isAvailable(book, { em })) throw new ExistError()
      const updatedLoan = await this.loanService.update(loan, { status: LoanStatus.Active }, { em })
      em.persist(updatedLoan)
      return updatedLoan
    })
    return result
  }

  @Mutation(() => Loan)
  async cancelLoan(
    @Args() args: LoanWhereUniqueInput,
    @CurrentUser() currentUser: User
  ): Promise<Loan> {
    const result = await this.orm.em.transactional(async (em) => {
      const loan = await this.loanService.getOneOrFail(
        { uuid: args.loanUuid },
        { em, populate: ['user'] }
      )
      const user = await loan.user.load()
      if (loan.status !== LoanStatus.Request || currentUser.id !== user.id)
        throw new ValidationError()
      await this.loanService.remove(loan, { em })
      return loan
    })
    return result
  }

  @Mutation(() => Loan)
  async rejectLoan(@Args() args: LoanWhereUniqueInput, @CurrentUser() user: User): Promise<Loan> {
    const result = await this.orm.em.transactional(async (em) => {
      const loan = await this.loanService.getOneOrFail(
        { uuid: args.loanUuid },
        { em, populate: ['book.owner'] }
      )
      const book = await loan.book.load()
      const owner = await book.owner.load()
      if (loan.status !== LoanStatus.Request || owner.id !== user.id) throw new ValidationError()
      await this.loanService.remove(loan, { em })
      return loan
    })
    return result
  }

  @Mutation(() => Loan)
  async finishLoan(@Args() args: LoanWhereUniqueInput, @CurrentUser() user: User): Promise<Loan> {
    const result = await this.orm.em.transactional(async (em) => {
      const loan = await this.loanService.getOneOrFail(
        { uuid: args.loanUuid },
        { em, populate: ['book.owner'] }
      )
      const book = await loan.book.load()
      const owner = await book.owner.load()
      if (loan.status !== LoanStatus.Active || owner.id !== user.id) throw new ValidationError()
      const updatedLoan = await this.loanService.update(
        loan,
        { status: LoanStatus.Finish, finishedAt: new Date() },
        { em }
      )
      em.persist(updatedLoan)
      return updatedLoan
    })
    return result
  }

  @ResolveField('user', () => User)
  async resolveUser(@Parent() loan: Loan): Promise<any> {
    return this.loanLoader.user().load(loan)
  }

  @ResolveField('book', () => Book)
  resolveBook(@Parent() loan: Loan): Promise<Book> {
    return this.loanLoader.book().load(loan)
  }
}
