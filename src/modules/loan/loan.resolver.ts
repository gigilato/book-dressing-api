import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { MikroORM } from '@mikro-orm/core'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@utils/guards'
import { CurrentUser } from '@utils/decorators'
import { ValidationError } from '@utils/errors'
import { Book } from '@modules/book/book.entity'
import { User } from '@modules/user/user.entity'
import { BookService } from '@modules/book/book.service'
import { Loan, LoanStatus } from './loan.entity'
import { LoanService } from './loan.service'
import { CreateLoanInput, LoanConnection, LoansInput, LoanWhereUniqueInput } from './loan.types'
import { LoanLoader } from './loan.loader'

@Resolver(() => Loan)
@UseGuards(AuthGuard)
export class LoanResolver {
  constructor(
    private readonly orm: MikroORM,
    private readonly loanService: LoanService,
    private readonly bookService: BookService,
    private readonly loanLoader: LoanLoader
  ) {}

  @Query(() => LoanConnection)
  loans(
    @CurrentUser() user: User,
    @Args({ nullable: true }) args?: LoansInput
  ): Promise<LoanConnection> {
    return this.loanService.getConnection({ user }, { limit: args?.limit, offset: args?.offset })
  }

  @Query(() => LoanConnection)
  loanRequests(
    @CurrentUser() owner: User,
    @Args({ nullable: true }) args?: LoansInput
  ): Promise<LoanConnection> {
    return this.loanService.getConnection(
      { book: { owner } },
      { limit: args?.limit, offset: args?.offset }
    )
  }

  @Mutation(() => Loan)
  async requestLoan(@Args() args: CreateLoanInput, @CurrentUser() user: User): Promise<Loan> {
    const result = await this.orm.em.transactional(async (em) => {
      const book = await this.bookService.getOneAvailableOrFail({ uuid: args.bookUuid }, { em })
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
        { em, populate: 'book.owner' }
      )
      if (loan.status !== LoanStatus.Request && loan.book.owner.id !== user.id)
        throw new ValidationError()
      const updatedLoan = await this.loanService.update(loan, { status: LoanStatus.Active }, { em })
      em.persist(updatedLoan)
      return updatedLoan
    })
    return result
  }

  @Mutation(() => Loan)
  async rejectLoan(@Args() args: LoanWhereUniqueInput, @CurrentUser() user: User): Promise<Loan> {
    const result = await this.orm.em.transactional(async (em) => {
      const loan = await this.loanService.getOneOrFail(
        { uuid: args.loanUuid },
        { em, populate: 'book.owner' }
      )
      if (loan.status !== LoanStatus.Request && loan.book.owner.id !== user.id)
        throw new ValidationError()
      const updatedLoan = await this.loanService.update(loan, { status: LoanStatus.Cancel }, { em })
      em.persist(updatedLoan)
      return updatedLoan
    })
    return result
  }

  @Mutation(() => Loan)
  async finishLoan(@Args() args: LoanWhereUniqueInput, @CurrentUser() user: User): Promise<Loan> {
    const result = await this.orm.em.transactional(async (em) => {
      const loan = await this.loanService.getOneOrFail(
        { uuid: args.loanUuid },
        { em, populate: 'book.owner' }
      )
      if (loan.status !== LoanStatus.Active && loan.book.owner.id !== user.id)
        throw new ValidationError()
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
  resolveUser(@Parent() loan: Loan): Promise<User> {
    return this.loanLoader.user().load(loan)
  }

  @ResolveField('book', () => Book)
  resolveBook(@Parent() loan: Loan): Promise<Book> {
    return this.loanLoader.book().load(loan)
  }
}
