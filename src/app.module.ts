import { Logger, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { config, MysqlConfig } from '@config'
import { UserModule } from '@modules/user/user.module'
import { BookModule } from '@modules/book/book.module'
import { LoanModule } from '@modules/loan/loan.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const mysql = configService.get<MysqlConfig>('mysql')
        const logger = new Logger('MikroORM')
        return {
          autoLoadEntities: true,
          type: 'mysql',
          dbName: mysql?.database,
          user: mysql?.username,
          password: mysql?.password,
          host: mysql?.host,
          port: mysql?.port,
          logger: logger.log.bind(logger),
          debug: mysql?.debug,
          charset: 'utf8mb4_unicode_ci',
        }
      },
      inject: [ConfigService],
    }),
    UserModule,
    BookModule,
    LoanModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
