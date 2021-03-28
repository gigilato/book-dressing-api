import { forwardRef, Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { UserModule } from '@modules/user/user.module'
import { LoanModule } from '@modules/loan/loan.module'
import { Book } from './book.entity'
import { BookService } from './book.service'
import { BookResolver } from './book.resolver'
import { BookLoader } from './book.loader'

@Module({
  imports: [MikroOrmModule.forFeature([Book]), UserModule, forwardRef(() => LoanModule)],
  providers: [BookService, BookResolver, BookLoader],
  exports: [MikroOrmModule, BookService, UserModule],
})
export class BookModule {}
