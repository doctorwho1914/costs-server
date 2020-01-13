import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Cost} from './entities/cost.entity';
import {Repository} from 'typeorm';
import {Category} from './entities/category.entity';

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
    return this.costRepository.insert(data);
  }

  listCost(): Promise<any[]> {
    return this.costRepository.find({
      order: {
        id: 'DESC',
      },
      relations: ['category'],
    });
  }
  categoryList(): Promise<any[]> {
    return this.categoryRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  delete(id: number): Promise<any> {
    return this.costRepository.delete(id);
  }
}
