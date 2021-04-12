import DataLoader from 'dataloader'
import { Injectable } from '@nestjs/common'
import { BookService } from '../book/book.service'
import { User } from './user.entity'

@Injectable()
export class UserLoader {
  constructor(private readonly bookService: BookService) {}

  bookCount() {
    return new DataLoader<User, number>(async (data) =>
      Promise.all(data.map((user) => this.bookService.getCount({ owner: user })))
    )
  }
}
