import DataLoader from 'dataloader'
import { Injectable } from '@nestjs/common'
import { User } from '../user/user.entity'
import { Book } from '../book/book.entity'
import { UserService } from '../user/user.service'
import { BookService } from '../book/book.service'
import { LoanService } from './loan.service'
import { Loan } from './loan.entity'

@Injectable()
export class LoanLoader {
  constructor(
    private readonly loanService: LoanService,
    private readonly userService: UserService,
    private readonly bookService: BookService
  ) {}

  user() {
    return new DataLoader<Loan, User>(async (data) =>
      Promise.all(
        data.map(async (loan) =>
          !loan.user.isInitialized()
            ? this.userService.getOneOrFail({ id: loan.user.unwrap().id })
            : loan.user.load()
        )
      )
    )
  }

  book() {
    return new DataLoader<Loan, Book>(async (data) =>
      Promise.all(
        data.map(async (loan) =>
          !loan.book.isInitialized()
            ? this.bookService.getOneOrFail({ id: loan.book.unwrap().id })
            : loan.book.load()
        )
      )
    )
  }
}
