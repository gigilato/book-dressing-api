import DataLoader from 'dataloader'
import { Injectable } from '@nestjs/common'
import { User } from '../user/user.entity'
import { UserService } from '../user/user.service'
import { LikeService } from '../like/like.service'
import { LoanService } from '../loan/loan.service'
import { Loan } from '../loan/loan.entity'
import { BookService } from './book.service'
import { Book } from './book.entity'

@Injectable()
export class BookLoader {
  constructor(
    private readonly bookService: BookService,
    private readonly userService: UserService,
    private readonly likeService: LikeService,
    private readonly loanService: LoanService
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

  hasLiked() {
    return new DataLoader<{ book: Book; user: User }, boolean>(async (data) =>
      Promise.all(
        data.map(async ({ book, user }) => {
          const existingLike = await this.likeService.getOne({ book, user })
          return !!existingLike
        })
      )
    )
  }

  likeCount() {
    return new DataLoader<Book, number>(async (data) =>
      Promise.all(data.map((book) => this.likeService.getCount({ book })))
    )
  }

  currentRequest() {
    return new DataLoader<{ book: Book; user: User }, Loan | null>(async (data) =>
      Promise.all(data.map(({ book, user }) => this.loanService.getCurrentRequest(book, user)))
    )
  }
}
