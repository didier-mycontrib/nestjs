import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { UserL1Dto, UserL0Dto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, } from 'typeorm';
import { UserEntity } from './entities/users.entity';


@Injectable()
export class UsersService {
      
  constructor(
    @InjectRepository(UserEntity) private userRepository: MongoRepository<UserEntity>,
    @InjectMapper() private readonly classMapper: Mapper,
    ){}

    async findAll():Promise<UserL1Dto[]>{
    const userEntityArray  : UserEntity[] = await this.userRepository.find();
    //console.log(`userDocArray=${JSON.stringify(userEntityArray)}`)
    return this.classMapper.mapArrayAsync(userEntityArray,UserEntity,UserL1Dto);
    }

    async findOne(id: string):Promise<UserL1Dto>{
      try{ 
          const userEntity = await this.userRepository.findOneById( id );
          if(userEntity==null)
            throw new Error(`NOT_FOUND: user not found with id=${id}`);
          else
            return this.classMapper.mapAsync(userEntity,UserEntity,UserL1Dto);
      }catch(ex){
        const subErrorPrefix = (ex instanceof Error)?`${ex.message}:`:"";
        throw new Error(`${subErrorPrefix}exception in UserService.findOne() with id=${id}`);
      }
    }

    async findByUsername(username: string):Promise<UserL1Dto>{
        try{ 
            const userEntity = await this.userRepository.findOneBy({ username: username});
            if(userEntity==null)
              throw new Error(`NOT_FOUND: user not found with username=${username}`);
            else
              return this.classMapper.mapAsync(userEntity,UserEntity,UserL1Dto);
        }catch(ex){
          const subErrorPrefix = (ex instanceof Error)?`${ex.message}:`:"";
          throw new Error(`${subErrorPrefix}exception in UserService.findByUsername() with username=${username}`);
        }
    }

    async bcryptPassword(password:string){
        const saltOrRounds = 10;
        return  await bcrypt.hash(password, saltOrRounds);
    }

    async create(user: UserL0Dto): Promise<UserL1Dto> {
        const userToCreate = user; // compatible , more simple
        //const userToCreate = this.classMapper.map(user,UserL0Dto,UserEntity); //ok
        userToCreate.newPassword=await this.bcryptPassword(userToCreate.newPassword??"");
        const savedUserAsUserEntity = await this.userRepository.save(userToCreate);
        return this.classMapper.mapAsync(savedUserAsUserEntity,UserEntity,UserL1Dto);
    }

    async remove(id: string): Promise<boolean>{
      const doesNewsExit = (await this.userRepository.findOneById( id))!=null ;
      if(!doesNewsExit)
         throw new Error(`NOT_FOUND: not existing user to delete with id==${id}`);
      try{ 
        const deletedResult = await this.userRepository.delete(id); //deletedResult
        //console.log("deletedResult=" + JSON.stringify(deletedResult));
        return (deletedResult.affected===1);
      }catch(ex){
        const subErrorPrefix = (ex instanceof Error)?`${ex.message}:`:"";
       throw new Error(`${subErrorPrefix}Exception in UserService.remove() with id==${id}`);
      }
    }



  async update(id:string , dto : UserL1Dto): Promise<boolean> {
    //const doesExit = await this.userRepository.exists({ where: { id: id } });
    //dont work because Query Builder is not supported by MongoDB
    const doesNewsExit = (await this.userRepository.findOneById( id))!=null ;
    if(!doesNewsExit)
        throw new Error(`NOT_FOUND: not existing user to update with id==${id}`);
    try{ 
      const userToUpdate = dto; // compatible , more simple
        //const userToUpdate = this.classMapper.map(dto,UserL1Dto,UserEntity); 
        const updateResult =  await this.userRepository.update(id, userToUpdate);
        console.log("updateResult="+JSON.stringify(updateResult)); //no updatedEntity , just affected
        return (updateResult.affected===1);
    }catch(ex){
      const subErrorPrefix = (ex instanceof Error)?`${ex.message}:`:"";
       throw new Error(`${subErrorPrefix}Exception in UserService.update() with id==${id}`);
    }
  }

}
