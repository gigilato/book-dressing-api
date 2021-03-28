import { Injectable } from '@nestjs/common'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { BaseService } from '@utils/entity'
import { Book } from './book.entity'

@Injectable()
export class BookService extends BaseService(Book) {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: EntityRepository<Book>
  ) {
    super(bookRepository)
  }
}
