import DataLoader from 'dataloader'
import { Injectable } from '@nestjs/common'
import { User } from '@modules/user/user.entity'
import { UserService } from '@modules/user/user.service'
import { BookService } from './book.service'
import { Book } from './book.entity'

@Injectable()
export class BookLoader {
  constructor(
    private readonly bookService: BookService,
    private readonly userService: UserService
  ) {}

  owner() {
    return new DataLoader<Book, User>(async (data) =>
      Promise.all(
        data.map(async (book) =>
          !book.owner.isInitialized()
            ? this.userService.getOneOrFail({ id: book.owner.unwrap().id })
            : book.owner.load()
        )
      )
    )
  }

  available() {
    return new DataLoader<Book, boolean>(async (data) =>
      Promise.all(data.map((book) => this.bookService.isAvailable(book)))
    )
  }
}
