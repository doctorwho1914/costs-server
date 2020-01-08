import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Cost} from './entities/cost.entity';
import {Repository} from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Cost)
    private readonly costRepository: Repository<Cost>,
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
    });
  }
}
