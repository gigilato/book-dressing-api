import { forwardRef, Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { BookModule } from '../book/book.module'
import { User } from './user.entity'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { UserController } from './user.controller'
import { UserLoader } from './user.loader'

@Module({
  imports: [MikroOrmModule.forFeature([User]), forwardRef(() => BookModule)],
  providers: [UserService, UserResolver, UserLoader],
  controllers: [UserController],
  exports: [MikroOrmModule, UserService],
})
export class UserModule {}
