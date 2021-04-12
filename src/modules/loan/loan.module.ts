import { forwardRef, Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { BookModule } from '../book/book.module'
import { Loan } from './loan.entity'
import { LoanService } from './loan.service'
import { LoanResolver } from './loan.resolver'
import { LoanLoader } from './loan.loader'
import { UserModule } from '../user/user.module'

@Module({
  imports: [
    MikroOrmModule.forFeature([Loan]),
    forwardRef(() => BookModule),
    forwardRef(() => UserModule),
  ],
  providers: [LoanService, LoanResolver, LoanLoader],
  exports: [MikroOrmModule, LoanService],
})
export class LoanModule {}
