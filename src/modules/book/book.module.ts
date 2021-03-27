import { Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Book } from './book.entity'
import { BookService } from './book.service'
import { BookResolver } from './book.resolver'

@Module({
  imports: [MikroOrmModule.forFeature([Book])],
  providers: [BookService, BookResolver],
  exports: [MikroOrmModule, BookService],
})
export class BookModule {}
