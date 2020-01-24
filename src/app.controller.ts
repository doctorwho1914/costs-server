import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/api/category')
  categoryList(): Promise<any[]> {
    try {
      return this.appService.categoryList();
    } catch (e) {
      return e;
    }
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
  listCost(
    @Query('fromDate') fromDate,
    @Query('toDate') toDate,
  ): Promise<any[]> {
    try {
      return this.appService.listCost(fromDate, toDate);
    } catch (e) {
      return e;
    }
  }

  @Get('/api/cost/statistics')
  sumByCategory(
    @Query('fromDate') fromDate,
    @Query('toDate') toDate,
  ): Promise<any[]> {
    try {
      return this.appService.sumByCategory(fromDate, toDate);
    } catch (e) {
      return e;
    }
  }

  @Delete('/api/cost/:id')
  delete(
    @Param() id: number,
  ): Promise<any[]> {
    try {
      return this.appService.delete(id);
    } catch (e) {
      return e;
    }
  }
}
