import { NestFactory } from '@nestjs/core'
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'
import { useContainer } from 'class-validator'
import { AppModule } from './app.module'

let app: NestExpressApplication

const bootstrap = async () => {
  app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  const config = app.get(ConfigService)
  const port = config.get('port')

  await app.listen(port, () =>
    Logger.log(
      `
      =====================================================================================
      -> NestJS GraphQL server is running on port ${port} 🏃
      =====================================================================================
      `
    )
  )
}
bootstrap()

process.on('SIGINT', () => {
  console.log('Server stopped')
  app?.close()
})
