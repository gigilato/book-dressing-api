import { Module } from '@nestjs/common'
import { BookModule } from '../modules/book/book.module'
import { FixturesService } from './fixtures.service'

@Module({
  imports: [BookModule],
  providers: [FixturesService],
})
export class FixturesModule {}
