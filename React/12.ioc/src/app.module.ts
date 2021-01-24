import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  UseClassLoggerService,
  UseFactoryLoggerService,
  UseValueLoggerService,
} from './logger.service';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: UseClassLoggerService, // Token 类型 标志
      useClass: UseClassLoggerService, // 注册的是一个类
    },
    {
      provide: UseValueLoggerService, // Token 类型 标志
      useValue: new UseValueLoggerService(), // 注册的是一个实例
    },
    {
      provide: UseFactoryLoggerService, // Token 类型 标志
      useFactory: () => new UseFactoryLoggerService(), // 注册的是一个实例
    },
  ],
})
export class AppModule {}
