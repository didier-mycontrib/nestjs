import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './customer.itf';
import { Message } from 'src/common/message';
import { CustomerDto } from './customer.dto';
import { ApiResponse } from '@nestjs/swagger';
import { classToPlain, instanceToPlain, plainToClass, plainToInstance } from 'class-transformer';


@Controller('customers')
export class CustomerController {

    constructor(private readonly customerService: CustomerService) {
    }

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiResponse({
        description : "collection of searched customers",
        type: [CustomerDto],
      })
    async getCustomersByCriteria(): Promise<CustomerDto[]> {
        const customersArray = await this.customerService.findAll();
        //return customersArray;
        return plainToInstance(CustomerDto,customersArray);
    }

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor) //to interpret @Exlude , @Expose during json serialization
    async getCustomerById(@Param('id') id:number): Promise<CustomerDto> {
        let customer = await this.customerService.findOne(id);
        if(customer==undefined)  
            throw new HttpException('customer not found with id='+id, HttpStatus.NOT_FOUND);
        const custDto = plainToInstance(CustomerDto,customer); //may ignore some unkowned properties (set them to undefined)
        //custDto.password="007";
        return custDto;
    }

    //{ "firstName" : "prenom_x" , "lastname" : "nom_y" }
    @Post()
    //@UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() c: CustomerDto): Promise<Customer> {
        //console.log("CustomerController.create() with c = " + JSON.stringify(c));
        
        console.log( 'In CustomerController.create() typeof c = ' + typeof c);
        if(c instanceof CustomerDto) console.log("c is an instance of CustomerDto if ValidationPipe with trnsform:true");
        else console.log("In CustomerController.create() c is a plain object");
        
        //NB: CustomerDto is just a "virtual type (typescript compiler)" ,
        //it is interpret by swagger and ValidationPipe
        //at runtime phase : c is just a plainObject (result of JSON.parse())
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
