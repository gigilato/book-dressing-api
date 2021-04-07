import { NestFactory } from '@nestjs/core'
import { UserModule } from '../src/modules/user/user.module'
import { UserService } from '../src/modules/user/user.service'
import { AppModule } from '../src/app.module'
import { FixturesModule, FixturesService } from '../src/fixtures'
;(async () => {
  const context = await NestFactory.createApplicationContext(AppModule)

  const fixturesModule = context.select<FixturesModule>(FixturesModule)
  const fixturesService = fixturesModule.get<FixturesService>(FixturesService)

  const userModule = context.select<UserModule>(UserModule)
  const userService = userModule.get<UserService>(UserService)

  if (!process.argv[2]) throw new Error('usage: yarn seed:books [user-email]')
  const user = await userService.getOneOrFail({ email: process.argv[2] })

  console.log('Seed books...')
  await fixturesService.book.injectBookForUser(user)
})()
  .then(() => {
    console.log(`Success!`)
    process.exit(0)
  })
  .catch((error) => {
    console.log(error)
  })
