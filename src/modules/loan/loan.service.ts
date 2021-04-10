import { Injectable } from '@nestjs/common'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { BaseService } from '@utils/entity'
import { ServiceMethodOptions } from '@utils/types'
import { Book } from '@modules/book/book.entity'
import { User } from '@modules/user/user.entity'
import { Loan, LoanStatus } from './loan.entity'

@Injectable()
export class LoanService extends BaseService(Loan) {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: EntityRepository<Loan>
  ) {
    super(loanRepository)
  }

  getCurrentRequest(book: Book, user: User, options?: ServiceMethodOptions) {
    return this.getOne(
      {
        book,
        user,
        status: { $in: [LoanStatus.Request, LoanStatus.Active] },
      },
      options
    )
  }
}
