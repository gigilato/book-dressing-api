import { Injectable, Inject } from '@nestjs/common'
import { FixturesBookService } from './services/fixtures.book'

@Injectable()
export class FixturesService {
  constructor(
    @Inject(FixturesBookService)
    public readonly book: FixturesBookService
  ) {}
}
