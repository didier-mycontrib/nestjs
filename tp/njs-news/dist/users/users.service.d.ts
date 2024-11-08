import { Mapper } from '@automapper/core';
import { Model } from 'mongoose';
import { UserL1Dto, UserL0Dto } from './dto/users.dto';
import { UserDoc } from './entities/users.entity';
export declare class UsersService {
    private readonly userModel;
    private readonly classMapper;
    constructor(userModel: Model<UserDoc>, classMapper: Mapper);
    findAll(): Promise<UserL1Dto[]>;
    findOne(id: string): Promise<UserL1Dto>;
    findByUsername(username: string): Promise<UserL1Dto>;
    bcryptPassword(password: string): Promise<string>;
    create(user: UserL0Dto): Promise<UserL1Dto>;
    remove(id: string): Promise<any>;
    update(id: string, userDto: UserL1Dto): Promise<UserL1Dto>;
}
