import { Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Book } from './book.entity'
import { BookService } from './book.service'

@Module({
  imports: [MikroOrmModule.forFeature([Book])],
  providers: [BookService],
  exports: [MikroOrmModule, BookService],
})
export class BookModule {}
