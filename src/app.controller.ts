import {Body, Controller, Get, Post} from '@nestjs/common';
import {AppService} from './app.service';
import {Cost} from './entities/cost.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/cost')
  addCost(
    @Body() data: any,
  ): Promise<any> {
    try {
      return this.appService.addCost(data);
    } catch (e) {
      return e;
    }
  }

  @Get('/cost')
  listCost(): Promise<any[]> {
    try {
      return this.appService.listCost();
    } catch (e) {
      return e;
    }
  }
}
