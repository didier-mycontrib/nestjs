import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { Customer } from './customer.itf';

@Injectable()
export class CustomerService {

    constructor(
        @InjectRepository(CustomerEntity)
        private customerRepository: Repository<Customer>,
      ) {}
    
      findAll(): Promise<Customer[]> {
        return this.customerRepository.find();
      }
    
      findOne(id: number): Promise<Customer | null> {
        return this.customerRepository.findOneBy({ id });
      }
    
      async remove(id: number): Promise<void> {
        await this.customerRepository.delete(id);
      }

      async create(c : Customer): Promise<Customer> {
        const insertRes =  await this.customerRepository.insert(c);
        c.id = Number(insertRes.identifiers[0]);
        return c;
      }

      async update(id:number , c : Customer): Promise<Customer> {
        await this.customerRepository.update(id,c);
        return c;
      }
}
