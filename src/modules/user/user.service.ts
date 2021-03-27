import { Injectable } from '@nestjs/common'
import { MikroORM } from '@mikro-orm/core'
import { EntityManager } from '@mikro-orm/mysql'

@Injectable()
export class UserService {
  constructor(private readonly orm: MikroORM, private readonly em: EntityManager) {}
}
