import {Body, Controller, Get, Post} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/api/cost')
  addCost(
    @Body() data: any,
  ): Promise<any> {
    try {
      return this.appService.addCost(data);
    } catch (e) {
      return e;
    }
  }

  @Get('/api/cost')
  listCost(): Promise<any[]> {
    try {
      return this.appService.listCost();
    } catch (e) {
      return e;
    }
  }
}
