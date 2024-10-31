
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'; 
import { Customer } from './customer.itf';

@Entity("customer")
export class CustomerEntity implements Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

}
