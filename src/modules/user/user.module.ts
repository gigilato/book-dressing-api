import { Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { User } from './user.entity'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { UserController } from './user.controller'

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [UserService, UserResolver],
  controllers: [UserController],
  exports: [MikroOrmModule, UserService],
})
export class UserModule {}
