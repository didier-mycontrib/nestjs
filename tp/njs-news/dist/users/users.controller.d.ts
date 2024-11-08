import { UserL1Dto, UserL0Dto } from './dto/users.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    getById(id: string): Promise<UserL1Dto>;
    findByCriteria(): Promise<UserL1Dto[]>;
    create(user: UserL0Dto): Promise<UserL1Dto>;
    remove(id: string): Promise<any>;
    update(userToUpdate: UserL1Dto, id: string): Promise<UserL1Dto>;
}
