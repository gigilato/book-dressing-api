import DataLoader from 'dataloader'
import { Injectable } from '@nestjs/common'
import { User } from '@modules/user/user.entity'
import { Book } from '@modules/book/book.entity'
import { LoanService } from './loan.service'
import { Loan } from './loan.entity'

@Injectable()
export class LoanLoader {
  constructor(private readonly loanService: LoanService) {}

  user() {
    return new DataLoader<Loan, User>(async (data) =>
      Promise.all(
        data.map(async (loan) => {
          const { user } = await this.loanService.populate(loan, { populate: 'user' })
          return user
        })
      )
    )
  }

  book() {
    return new DataLoader<Loan, Book>(async (data) =>
      Promise.all(
        data.map(async (loan) => {
          const { book } = await this.loanService.populate(loan, { populate: 'book' })
          return book
        })
      )
    )
  }
}
