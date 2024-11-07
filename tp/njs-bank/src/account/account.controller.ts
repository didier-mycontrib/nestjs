import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from './account.itf';
import { Message } from 'src/common/message';

@Controller('accounts')
export class AccountController {
    constructor(private readonly accountService: AccountService) {
    }

    // .../bank-api/accounts --> all accounts
    // .../bank-api/accounts?minimumBalance=0 
    // .../bank-api/accounts?ownerId=1
    @Get()
    async getAccountsByCriteria(@Query('minimumBalance') minimumBalance : number|undefined  , 
                                @Query('ownerId') ownerId : number|undefined ): Promise<Account[]> {
        let aArray = null;
        if(minimumBalance) aArray=await this.accountService.findWithMinimumBalance(minimumBalance);
        else if(ownerId) aArray=await this.accountService.findByOwnerId(ownerId);
        else aArray=await this.accountService.findAll();
        return aArray;
    }
    
    @Get(':id')
    async getCustomerById(@Param('id') num:number): Promise<Account> {
        let account = await this.accountService.findOne(num);
        if(account==undefined)  
            throw new HttpException('account not found with id='+num, HttpStatus.NOT_FOUND);
        return account;
    }

    //{ "label" : "compte_xyz" , "balance" : 0 }
    @Post()
    async create(@Body() a: Account): Promise<Account> {
        //console.log("AccountController.create() with a = " + JSON.stringify(a));
        const createadAccount = await this.accountService.create(a);
        return createadAccount;
     }
  
     @Delete(':id')
     async delete(@Param('id') id:number): Promise<any> {
        console.log("AccountController.delete() with id = " + id);
       /*let deleteOk =*/ await this.accountService.remove(id);
      /* if(deleteOk==false)  
            throw new HttpException('not existing customer to delete with id='+id, HttpStatus.NOT_FOUND);
       else*/
          return new Message("account with id="+id + " is now deleted");
    }
  
    //{"num": "1" ,  "label" : "compte_xyz" , "balance" : 0 }
    @Put(':id')
    async update(@Body() accountToUpdate: Account, @Param('id') id:number): Promise<Account> {
        console.log("AccountController.update() with id = " + id 
                    + " and accountToUpdate = " + JSON.stringify(accountToUpdate));
        let updatedAccount = await  this.accountService.update(id, accountToUpdate);
        if(updatedAccount==undefined)  
            throw new HttpException('not existing account to update with id='+id, HttpStatus.NOT_FOUND);
        return updatedAccount;
    }
}
