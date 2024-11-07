import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { OperationService } from './operation.service';
import { Operation } from './operation.itf';

@Controller('operations')
export class OperationController {
    constructor(private readonly operationService: OperationService) {
    }

    // .../bank-api/operations --> all accounts
    // .../bank-api/operations?accountNum=1
    @Get()
    async getOperationsByCriteria(@Query('accountNum') accountNum : number|undefined ): Promise<Operation[]> {
        let operationsArray = undefined;
        if(accountNum) operationsArray=await this.operationService.findByAccountNum(accountNum);
        else operationsArray = await this.operationService.findAll();
        return operationsArray
    }

    @Get(':id')
    async getOperationById(@Param('id') id:number): Promise<Operation> {
        let op = await this.operationService.findOne(id);
        if(op==undefined)  
            throw new HttpException('operation not found with id='+id, HttpStatus.NOT_FOUND);
        return op;
    }
}
