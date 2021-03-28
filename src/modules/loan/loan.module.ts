import { forwardRef, Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { BookModule } from '@modules/book/book.module'
import { Loan } from './loan.entity'
import { LoanService } from './loan.service'
import { LoanResolver } from './loan.resolver'
import { LoanLoader } from './loan.loader'

@Module({
  imports: [MikroOrmModule.forFeature([Loan]), forwardRef(() => BookModule)],
  providers: [LoanService, LoanResolver, LoanLoader],
  exports: [MikroOrmModule, LoanService],
})
export class LoanModule {}
