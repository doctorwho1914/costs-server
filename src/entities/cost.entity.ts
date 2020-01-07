import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn} from 'typeorm';

@Entity()
export class Cost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  category: number;

  @OneToOne(type => Cost)
  cost: Cost;

  @Column('decimal')
  value: number;

  @Column({nullable: true, type: 'text'})
  description?: string | null;

  @CreateDateColumn()
  createdAt: boolean;
}
