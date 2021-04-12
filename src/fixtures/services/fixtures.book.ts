import { Injectable } from '@nestjs/common'
import faker from 'faker'
import { Book } from '../../modules/book/book.entity'
import { BookService } from '../../modules/book/book.service'
import { User } from '../../modules/user/user.entity'

const pictures = [
  'https://static01.nyt.com/images/2014/02/05/books/05before-and-after-slide-T6H2/05before-and-after-slide-T6H2-superJumbo.jpg?quality=75&auto=webp&disable=upscale',
  'https://images-na.ssl-images-amazon.com/images/I/51XEV83ibyL._SX319_BO1,204,203,200_.jpg',
  'https://kbimages1-a.akamaihd.net/ad579858-3886-49b2-9877-d48e272120bf/353/569/90/False/harry-potter-and-the-chamber-of-secrets-5.jpg',
  'https://kbimages1-a.akamaihd.net/99fbc66f-a5b2-4f32-850c-c19c3cffe27f/1200/1200/False/harry-potter-and-the-order-of-the-phoenix-6.jpg',
  'https://images-na.ssl-images-amazon.com/images/I/51EstVXM1UL._SX331_BO1,204,203,200_.jpg',
  'https://kbimages1-a.akamaihd.net/1a3242ad-3242-42e2-b5eb-41021cf47c58/353/569/90/False/the-fellowship-of-the-ring-the-lord-of-the-rings-book-1-1.jpg',
  'https://www.oberlo.com/media/1603897583-image16-1.jpg?w=1824&fit=max',
  'https://www.oberlo.com/media/1603897583-image17-1.jpg?w=1824&fit=max',
  'https://cdn.lifehack.org/wp-content/uploads/2015/03/1984.jpg',
  'https://m.media-amazon.com/images/I/51+NSbj46NL.jpg',
  'https://makinglemonadeblog.com/wp-content/uploads/2016/07/best-book-summer-reading-list-2016.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREulUdWXm2mqlXttGYBKc-ln8L5xEsU_vtfg&usqp=CAU',
  'https://cdn1.booknode.com/book_cover/515/mod11/100_must-read_life-changing_books-515283-264-432.jpg',
  'https://www.gannett-cdn.com/presto/2019/12/10/USAT/27a09465-2fef-4b4e-911d-a2c6d627575f-AmericanDirt_FINAL.jpg?width=1588',
  'https://must-readbooks.com/wp-content/uploads/2020/11/Mariette-Lindstein-fog-island.jpg',
  'https://images.squarespace-cdn.com/content/v1/5df12182bbdf986d02a4b07d/1590793368876-46TRWMKCZP2QWD07DDWI/ke17ZwdGBToddI8pDm48kCiC6x0kNpxliGpzQTkOLNUUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8PaoYXhp6HxIwZIk7-Mi3Tsic-L2IOPH3Dwrhl-Ne3Z2ppk8fIk4OUdzzAJ58dNz9ksAnbOUWC6fgQEHg0Bz14hkOpdljO7Z-5qh0zg85Jnj/Must+Read+Books+for+Business',
]

@Injectable()
export class FixturesBookService {
  constructor(private readonly bookService: BookService) {}

  injectBookForUser(user: User): Promise<Book[]> {
    return Promise.all<Book>(
      pictures.map((pictureUrl) =>
        this.bookService.create({
          author: faker.name.findName(),
          description: faker.lorem.lines(6),
          owner: user,
          title: faker.name.title(),
          pictureUrl,
        })
      )
    )
  }
}
