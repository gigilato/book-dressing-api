import { Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { UserModule } from '@modules/user/user.module'
import { Book } from './book.entity'
import { BookService } from './book.service'
import { BookResolver } from './book.resolver'
import { BookLoader } from './book.loader'

@Module({
  imports: [MikroOrmModule.forFeature([Book]), UserModule],
  providers: [BookService, BookResolver, BookLoader],
  exports: [MikroOrmModule, BookService, UserModule],
})
export class BookModule {}
