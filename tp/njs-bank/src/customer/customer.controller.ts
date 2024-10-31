import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './customer.itf';
import { Message } from 'src/common/message';


@Controller('customers')
export class CustomerController {

    constructor(private readonly customerService: CustomerService) {
    }

    @Get()
    async getCustomersByCriteria(): Promise<Customer[]> {
        const customersArray = await this.customerService.findAll();
        return customersArray
    }

    @Get(':id')
    async getCustomerById(@Param('id') id:number): Promise<Customer> {
        let customer = await this.customerService.findOne(id);
        if(customer==undefined)  
            throw new HttpException('customer not found with id='+id, HttpStatus.NOT_FOUND);
        return customer;
    }

    //{ "firstName" : "prenom_x" , "lastname" : "nom_y" }
    @Post()
    async create(@Body() c: Customer): Promise<Customer> {
        //console.log("CustomerController.create() with c = " + JSON.stringify(c));
        const createadCustomer = await this.customerService.create(c);
        return createadCustomer;
     }
  
     @Delete(':id')
     async delete(@Param('id') id:number): Promise<any> {
        console.log("CustomerController.delete() with id = " + id);
       /*let deleteOk =*/ await this.customerService.remove(id);
      /* if(deleteOk==false)  
            throw new HttpException('not existing customer to delete with id='+id, HttpStatus.NOT_FOUND);
       else*/
          return new Message("customer with id="+id + " is now deleted");
    }
  
    //{"id": "1" ,  "firstName" : "prenom_x" , "lastname" : "nom_y" }
    @Put(':id')
    async update(@Body() customerToUpdate: Customer, @Param('id') id:number): Promise<Customer> {
        console.log("CustomerController.update() with id = " + id 
                    + " and customerToUpdate = " + JSON.stringify(customerToUpdate));
        let updatedCustomer = await  this.customerService.update(id, customerToUpdate);
        if(updatedCustomer==undefined)  
            throw new HttpException('not existing customer to update with id='+id, HttpStatus.NOT_FOUND);
        return updatedCustomer;
    }
}
