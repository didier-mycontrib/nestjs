import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm'; 
import { Account } from './account.itf';
import { Customer } from 'src/customer/customer.itf';
import { CustomerEntity } from 'src/customer/customer.entity';

@Entity("account")
export class AccountEntity implements Account {
  @PrimaryGeneratedColumn()
  num: number;

  @Column()
  label: string;

  @Column()
  balance: number;

  /*
  // OLD n-1 version:
  @ManyToOne(()=> CustomerEntity , owner => owner.id)
  @JoinColumn({name:'customer_id'})
  owner : CustomerEntity;
  */

   // NEW n-n version (joinColumn : this_side , inverseJoinColumn : collection side )
   @ManyToMany(()=> CustomerEntity )
   @JoinTable({ name: 'customer_account' ,
    joinColumn: { name: 'account_num' },
    inverseJoinColumn: {  name: 'customer_id' }
   })
   owners : CustomerEntity[];

}