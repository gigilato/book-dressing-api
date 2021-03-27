import { Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Loan } from './loan.entity'
import { LoanService } from './loan.service'

@Module({
  imports: [MikroOrmModule.forFeature([Loan])],
  providers: [LoanService],
  exports: [MikroOrmModule, LoanService],
})
export class LoanModule {}
