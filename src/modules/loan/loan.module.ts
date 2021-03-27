import { Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Loan } from './loan.entity'
import { LoanService } from './loan.service'
import { LoanResolver } from './loan.resolver'

@Module({
  imports: [MikroOrmModule.forFeature([Loan])],
  providers: [LoanService, LoanResolver],
  exports: [MikroOrmModule, LoanService],
})
export class LoanModule {}
