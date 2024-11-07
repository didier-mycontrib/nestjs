
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'; 
import { Customer } from './customer.itf';
import { Exclude } from 'class-transformer';

@Entity("customer")
export class CustomerEntity implements Customer {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  //@Exclude() //ancien test temporaire
  email: string;

}
