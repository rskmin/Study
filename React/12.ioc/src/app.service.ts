import { Injectable } from '@nestjs/common';
import {
  UseClassLoggerService,
  UseFactoryLoggerService,
  UseValueLoggerService,
} from './logger.service';

// 可被注入别的服务
@Injectable()
export class AppService {
  constructor(
    private UseClassLoggerService: UseClassLoggerService,
    private UseValueLoggerService: UseValueLoggerService,
    private UseFactoryLoggerService: UseFactoryLoggerService,
    ) {}
  getHello() {
    this.UseClassLoggerService.log('UseClassLoggerService');
    this.UseValueLoggerService.log('UseValueLoggerService')
    this.UseFactoryLoggerService.log('UseFactoryLoggerService');
    return 'hello';
  }
}
