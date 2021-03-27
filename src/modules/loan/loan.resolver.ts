import { Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { DeepPartial } from '@utils/types'
import { Book } from '@modules/book/book.entity'
import { User } from '@modules/user/user.entity'
import { Loan } from './loan.entity'
import { LoanService } from './loan.service'

@Resolver(() => Loan)
export class LoanResolver {
  constructor(private readonly loanService: LoanService) {}

  @Query(() => [Loan])
  loansByMe(): DeepPartial<Loan[]> {
    return [{ uuid: 'uuid' }]
  }

  @Query(() => [Loan])
  loansToOthers(): DeepPartial<Loan[]> {
    return [{ uuid: 'uuid' }]
  }

  @Mutation(() => Loan)
  startLoan(): DeepPartial<Loan> {
    return { uuid: 'uuid' }
  }

  @Mutation(() => Loan)
  confirmLoan(): DeepPartial<Loan> {
    return { uuid: 'uuid' }
  }

  @Mutation(() => Loan)
  rejectLoan(): DeepPartial<Loan> {
    return { uuid: 'uuid' }
  }

  @Mutation(() => Loan)
  finishLoan(): DeepPartial<Loan> {
    return { uuid: 'uuid' }
  }

  @ResolveField('user', () => User)
  resolveUser(@Parent() loan: Loan): DeepPartial<User> {
    return { uuid: loan.uuid }
  }

  @ResolveField('book', () => Book)
  resolveBook(@Parent() loan: Loan): DeepPartial<Book> {
    return { uuid: loan.uuid }
  }
}
