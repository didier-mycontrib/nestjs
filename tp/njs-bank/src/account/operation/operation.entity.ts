import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'; 


import { AccountEntity } from '../account.entity';
import { Operation } from './operation.itf';

@Entity("operation")
export class OperationEntity implements Operation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  amount: number;

  @Column()
  opDateTime: Date;

  @ManyToOne(()=> AccountEntity , account => account.num)
  @JoinColumn({name:'account_num'})
  account : AccountEntity;

}