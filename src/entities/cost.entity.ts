import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, ManyToOne} from 'typeorm';
import {Category} from './category.entity';

@Entity()
export class Cost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  categoryId: number;

  @ManyToOne(type => Category, (category: Category) => category.costs)
  @JoinColumn()
  category: Category;

  @Column('decimal')
  value: number;

  @Column({nullable: true, type: 'text'})
  description?: string | null;

  @CreateDateColumn()
  createdAt: boolean;
}
