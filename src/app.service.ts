import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cost } from './entities/cost.entity';
import { Between, LessThanOrEqual, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import moment = require('moment');

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Cost)
    private readonly costRepository: Repository<Cost>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
  }

  getHello(): string {
    return 'Hello World!';
  }

  addCost(data): Promise<any> {
    if (!data.createdAt) {
      delete data.createdAt;
    }
    return this.costRepository.insert(data);
  }

  listCost(fromDate?, toDate?): Promise<any[]> {
    const options: any = {
      order: {
        createdAt: 'DESC',
      },
      relations: ['category'],
    };

    // todo remove this
    // tslint:disable-next-line:no-unused-expression
    toDate || (toDate = moment());
    // tslint:disable-next-line:no-unused-expression
    fromDate || (fromDate = moment().startOf('month'));

    options.where = `"createdAt" < '${moment(toDate).format('YYYY-MM-DD hh:mm:ss')}' and "createdAt"  > '${moment(fromDate).format('YYYY-MM-DD hh:mm:ss')}'`;
    return this.costRepository.find(options);
  }

  categoryList(): Promise<any[]> {
    return this.categoryRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  sumByCategory(fromDate?, toDate?): Promise<any[]> {
    const options: any = {
      order: {
        createdAt: 'DESC',
      },
      relations: ['category'],
    };

    // todo remove this
    // tslint:disable-next-line:no-unused-expression
    toDate || (toDate = moment());
    // tslint:disable-next-line:no-unused-expression
    fromDate || (fromDate = moment().startOf('month'));

    return this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.costs', 'costs', 'costs.createdAt BETWEEN :begin AND :end',
        {
          begin: moment(fromDate).format('YYYY-MM-DD hh:mm:ss'),
          end: moment(toDate).format('YYYY-MM-DD hh:mm:ss'),
        },)
      .select(['category.id as id', 'category.name as name'])
      .addSelect('SUM(value) AS sum')
      .groupBy('costs.categoryId')
      .addGroupBy('category.name')
      .addGroupBy('category.id')
      .orderBy('category.id')
      .getRawMany();
  }

  delete(id: number): Promise<any> {
    return this.costRepository.delete(id);
  }
}
