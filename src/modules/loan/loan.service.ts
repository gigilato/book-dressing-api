import { Injectable } from '@nestjs/common'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { BaseService } from '@utils/entity'
import { Loan } from './loan.entity'

@Injectable()
export class LoanService extends BaseService(Loan) {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: EntityRepository<Loan>
  ) {
    super(loanRepository)
  }
}
