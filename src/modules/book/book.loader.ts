import DataLoader from 'dataloader'
import { Injectable } from '@nestjs/common'
import { User } from '@modules/user/user.entity'
import { BookService } from './book.service'
import { Book } from './book.entity'

@Injectable()
export class BookLoader {
  constructor(private readonly bookService: BookService) {}

  owner() {
    return new DataLoader<Book, User>(async (data) =>
      Promise.all(
        data.map(async (book) => {
          const { owner } = await this.bookService.populate(book, { populate: 'owner' })
          return owner
        })
      )
    )
  }

  available() {
    return new DataLoader<Book, boolean>(async (data) =>
      Promise.all(data.map((book) => this.bookService.isAvailable(book)))
    )
  }
}
