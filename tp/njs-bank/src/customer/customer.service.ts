import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { Customer } from './customer.itf';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class CustomerService {

  /*
  public method should have abstract/interface/agnostic types (return value and parameters)
  it can match any compatible plain object (or instance of compatible classe)
  ------
  private code handles XyzEntity type (of typeorm)
  */

    constructor(
        @InjectRepository(CustomerEntity)
        private customerRepository: Repository<CustomerEntity>,
      ) {}
    
      async findAll(): Promise<Customer[]> {
        let custArray : CustomerEntity[] | null;
        custArray = await this.customerRepository.find();
        /*
        for(let c of custArray){
          console.log("**** " + JSON.stringify(c));
          console.log("#### " + JSON.stringify(instanceToPlain(c)));
        }
        */
        return custArray;
      }
    
      findOne(id: number): Promise<Customer | null> {
        return this.customerRepository.findOneBy({ id });
      }
    
      async remove(id: number): Promise<void> {
        await this.customerRepository.delete(id);
      }

      async create(c : Customer): Promise<Customer> {
        //console.log("customerService.create() called with c="+JSON.stringify(c))
        const insertRes =  await this.customerRepository.insert(c);
        //console.log("customerService.create() called with insertRes="+JSON.stringify(insertRes))
        c.id = Number(insertRes.generatedMaps[0]["id"]);
        return c;
      }

      async update(id:number , c : Customer): Promise<Customer> {
        await this.customerRepository.update(id,c);
        return c;
      }
}
