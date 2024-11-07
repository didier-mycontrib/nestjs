import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { OperationEntity } from './operation.entity';
import { Operation } from './operation.itf';
import { Account } from 'src/account/account.itf';
import { AccountEntity } from 'src/account/account.entity';

@Injectable()
export class OperationService {
    constructor(
        @InjectRepository(OperationEntity)
        private operationRepository: Repository<OperationEntity>
      ) {}
    
      findAll(): Promise<Operation[]> {
        return this.operationRepository.find();
      }

      findByAccountNum(accountNum:number): Promise<Operation[]> {
        return this.operationRepository.find({
         // relations: {account:true },
           where : {
                account :{
                   num : accountNum
                }
            }
        });
      }
    
      findOne(id: number): Promise<Operation | null> {
        return this.operationRepository.findOneBy({ id });
      }
    
      async remove(id: number): Promise<void> {
        await this.operationRepository.delete(id);
      }

      async create(op : Operation,account:Account): Promise<Operation> {
        (<OperationEntity> op).account=(<AccountEntity>account);
        const insertRes =  await this.operationRepository.insert(op);
        op.id = Number(insertRes.generatedMaps[0]["id"]);
        return op;
      }

      async update(id:number , op : Operation): Promise<Operation> {
        await this.operationRepository.update(id,op);
        return op;
      }
}
