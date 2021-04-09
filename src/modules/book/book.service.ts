import { Injectable } from '@nestjs/common'
import { EntityRepository, FilterQuery } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { LoanStatus } from '@modules/loan/loan.entity'
import { LoanService } from '@modules/loan/loan.service'
import { User } from '@modules/user/user.entity'
import { BaseService } from '@utils/entity'
import { ValidationError } from '@utils/errors'
import { ServiceMethodOptions } from '@utils/types'
import { Book, BookStatus } from './book.entity'

@Injectable()
export class BookService extends BaseService(Book) {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: EntityRepository<Book>,
    private readonly loanService: LoanService
  ) {
    super(bookRepository)
  }

  async validateOwnership(book: Book, user: User) {
    const owner = await book.owner.load()
    if (owner.id !== user.id) throw new ValidationError()
  }

  async isAvailable(book: Book, options?: ServiceMethodOptions) {
    const activeLoan = await this.loanService.getOne({ status: LoanStatus.Active }, options)
    return book.status === BookStatus.Active && !activeLoan
  }

  async getOneAvailableOrFail(where: FilterQuery<Book>, options?: ServiceMethodOptions) {
    const book = await this.getOneOrFail(where, options)
    const isBookAvailable = await this.isAvailable(book, options)
    if (!isBookAvailable) throw new ValidationError()
    return book
  }
}
