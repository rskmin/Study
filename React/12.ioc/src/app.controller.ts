import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  constructor(private appService: AppService) { }
  @Get('/hello')
  hello() { // 控制器里一般只用接收参数，返回响应，并不会真正业务
    let message = this.appService.getHello();
    return message;
  }
}