import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserL1Dto, UserL0Dto } from './dto/users.dto';
import { UserDoc, UserEntity } from './entities/users.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
      
  /*NB: @InjectModel('nameOfModel') must match the name of a model
  registered in MongooseModule.forFeature([ { name: "nameOfModel", schema : SchemaQuiVaBien}])
  au sein de app.module.ts ou bien xxx.module.ts (en plus de MongooseModule.forRoot)
  */

  constructor(
    @InjectModel('Users') private readonly userModel: Model<UserDoc>,
    @InjectMapper() private readonly classMapper: Mapper,
    ){}

    async findAll():Promise<UserL1Dto[]>{
    const userDocArray  : UserDoc[] = await this.userModel.find().exec();
    //console.log(`userDocArray=${JSON.stringify(userDocArray)}`)
    return this.classMapper.mapArrayAsync(userDocArray,UserEntity,UserL1Dto);
    }

    async findOne(id: string):Promise<UserL1Dto>{
    try{ 
        const userDoc = await this.userModel.findOne({ _id: id}).exec();
        return this.classMapper.mapAsync(userDoc,UserEntity,UserL1Dto);
    }catch(ex){
        throw new Error(`NOT_FOUND: user not found with id=${id}`);
    }
    }

    async findByUsername(username: string):Promise<UserL1Dto>{
        try{ 
            const userDoc = await this.userModel.findOne({ username: username}).exec();
            return this.classMapper.mapAsync(userDoc,UserEntity,UserL1Dto);
        }catch(ex){
            throw new Error(`NOT_FOUND: user not found with username=${username}`);
        }
    }

    async bcryptPassword(password:string){
        const saltOrRounds = 10;
        return  await bcrypt.hash(password, saltOrRounds);
    }

    async create(user: UserL0Dto): Promise<UserL1Dto> {
        const userToCreate = user; // compatible , more simple
        //const userToCreate = this.classMapper.map(user,UserL0Dto,UserEntity); //ok
        let persistentUserEntity = new this.userModel(userToCreate);
        persistentUserEntity.newPassword=await this.bcryptPassword(persistentUserEntity.newPassword??"");
        const savedUserAsUserEntity = <UserEntity> <any> await persistentUserEntity.save();
        return this.classMapper.mapAsync(savedUserAsUserEntity,UserEntity,UserL1Dto);
    }

    async remove(id: string): Promise<any>{
        const doesUserExit = await this.userModel.exists({ _id: id });
        if(!doesUserExit)
        throw new Error(`NOT_FOUND: not existing user to delete with id==${id}`);

        try{ 
        return await this.userModel.findByIdAndDelete(id); //deletedUser
        }catch(ex){
        throw new Error(`Exception in UserService.remove() with id==${id}`);
        }
    }

  async update(id: string, userDto: UserL1Dto): Promise<UserL1Dto> {
    const userToUpdate = userDto; // compatible , more simple
    //const userToUpdate = this.classMapper.map(userDto,UserL1Dto,UserEntity); //ok
    if(userToUpdate.newPassword!=null && userToUpdate.newPassword.charAt(0)!='')
       userToUpdate.newPassword=await this.bcryptPassword(userToUpdate.newPassword??"");

    const updatedUserAsUserEntity = <UserEntity> <any> await this.userModel.findByIdAndUpdate( id, userToUpdate, { userToUpdate: true });
    if(updatedUserAsUserEntity==undefined)  
      throw new Error(`NOT_FOUND: not existing user to update with id=${id}`);
    return this.classMapper.mapAsync(updatedUserAsUserEntity,UserEntity,UserL1Dto);
  }

}
