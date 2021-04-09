import { Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Like } from './like.entity'
import { LikeService } from './like.service'

@Module({
  imports: [MikroOrmModule.forFeature([Like])],
  providers: [LikeService],
  exports: [MikroOrmModule, LikeService],
})
export class LikeModule {}
