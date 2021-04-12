import { forwardRef, Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { UserModule } from '../user/user.module'
import { LoanModule } from '../loan/loan.module'
import { Book } from './book.entity'
import { BookService } from './book.service'
import { BookResolver } from './book.resolver'
import { BookLoader } from './book.loader'
import { LikeModule } from '../like/like.module'

@Module({
  imports: [
    MikroOrmModule.forFeature([Book]),
    forwardRef(() => UserModule),
    forwardRef(() => LoanModule),
    LikeModule,
  ],
  providers: [BookService, BookResolver, BookLoader],
  exports: [MikroOrmModule, BookService],
})
export class BookModule {}
