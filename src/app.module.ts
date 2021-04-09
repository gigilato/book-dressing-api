import { Logger, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { GraphQLModule } from '@nestjs/graphql'
import { config, GraphQLConfig, DatabaseConfig } from '@config'
import { UserModule } from '@modules/user/user.module'
import { BookModule } from '@modules/book/book.module'
import { LoanModule } from '@modules/loan/loan.module'
import { AuthModule } from '@modules/auth/auth.module'
import { LibrariesModule } from '@libraries/libraries.module'
import { GqlContext } from '@utils/types'
import { LikeModule } from './modules/like/like.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const database = configService.get<DatabaseConfig>('database')
        const logger = new Logger('MikroORM')
        return {
          clientUrl: database?.url,
          autoLoadEntities: true,
          type: 'postgresql',
          logger: logger.log.bind(logger),
          debug: database?.debug,
          charset: 'utf8mb4_unicode_ci',
        }
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const gqlOptions = configService.get<GraphQLConfig>('graphql')
        return {
          context: (ctx: GqlContext) => ({ req: ctx.req }),
          autoSchemaFile: true,
          ...gqlOptions,
        }
      },
      inject: [ConfigService],
    }),
    LibrariesModule,
    AuthModule,
    UserModule,
    BookModule,
    LoanModule,
    LikeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
