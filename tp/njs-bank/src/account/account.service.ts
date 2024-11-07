import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { AccountEntity } from './account.entity';
import { Account } from './account.itf';
import { OperationService } from 'src/account/operation/operation.service';
import { OperationEntity } from 'src/account/operation/operation.entity';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity)
        private accountRepository: Repository<AccountEntity>,
        private operationService : OperationService
      ) {}
    
      findAll(): Promise<Account[]> {
        return this.accountRepository.find();
      }

      findWithMinimumBalance(minimumBalance:number): Promise<Account[]> {
        return this.accountRepository.find({
          where : {
            balance : MoreThanOrEqual(minimumBalance)
          }
        });
      }

      /*
      //old n-1 version:
      findByOwnerId(ownerId:number): Promise<Account[]> {
        return this.accountRepository.find({
         // relations: {owner:true },
           where : {
                owner :{
                   id : ownerId
                }
            }
        });
      }
      */

      //new n-n version:
      findByOwnerId(ownerId:number): Promise<Account[]> {
        return this.accountRepository.createQueryBuilder('account')
            .leftJoin('account.owners', 'owner')
            .where('owner.id = :ownerId', { ownerId: ownerId })
            .getMany();
      }

      async doDebit(accountNum:number, amount:number ,opMessage:string){
        const a = await this.accountRepository.findOneBy({ num: accountNum });
       if(a){
         a.balance=a.balance - amount;
         await this.accountRepository.update(a.num,a);
         await this.operationService.create({amount:-amount , label:opMessage , opDateTime : new Date()},a);
       }
      }

      async doCredit(accountNum:number, amount:number ,opMessage:string){
        const a = await this.accountRepository.findOneBy({ num: accountNum });
       if(a){
         a.balance=Number(a.balance) + Number(amount);
         await this.accountRepository.update(a.num,a);
         await this.operationService.create({amount:amount , label:opMessage , opDateTime : new Date()},a);
       }
      }
    
      findOne(num: number): Promise<Account | null> {
        return this.accountRepository.findOneBy({ num });
      }
    
      async remove(id: number): Promise<void> {
        await this.accountRepository.delete(id);
      }

      async create(a : Account): Promise<Account> {
        const insertRes =  await this.accountRepository.insert(a);
        a.num = Number(insertRes.generatedMaps[0]["num"]);
        return a;
      }

      async update(id:number , a : Account): Promise<Account> {
        await this.accountRepository.update(id,a);
        return a;
      }
}
