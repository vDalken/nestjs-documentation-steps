import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { logger } from './middlewares/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cats/entities/cat.entity';

@Module({
  imports: [
    CatsModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV ?? 'dev'}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '090712',
      database: 'nestjs_test',
      entities: [Cat],
      synchronize: true,
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(CatsController);
  }
}
