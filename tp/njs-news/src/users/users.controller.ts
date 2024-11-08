
import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { ErrorExceptionFilter, HttpExceptionFilter } from 'src/common/error.exception.filter';
import { Message } from 'src/common/message';
import { UserL1Dto, UserL0Dto } from './dto/users.dto';
import { UsersService } from './users.service';
import { Public } from 'src/auth/public.decorator';


@Controller('users')
@UseFilters(new ErrorExceptionFilter(),new HttpExceptionFilter())
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get(':id')
    @Public()
    async getById(@Param('id') id:string): Promise<UserL1Dto> {
      return this.userService.findOne(id);
    }

    @Get()
    @Public()
    //@UseInterceptors(ClassSerializerInterceptor)
    async findByCriteria(): Promise<UserL1Dto[]> {
        return  this.userService.findAll();
    }

    //{ "userName" : "myUserName" , "firstName" : "myFirstName" , "lastName" : "myLastName" , "email" : "aaa.bbb@xyz.com" , "newPassword" : "pwd" , "mainGroup" : "myMainGroup"}
    @Public()
    @Post()
    async create(@Body() user: UserL0Dto): Promise<UserL1Dto> {
        return this.userService.create(user);//returning user with generated id
     }
  
     @Delete(':id')
     @Public()
     //@HttpCode(204) if no return json message
     async remove(@Param('id') id:string): Promise<any> {
       let deletedUser = await this.userService.remove(id);
       return new Message("user with id="+id + " is now deleted"); //with default 200/OK
       //ErrorExceptionFilter may return NOT_FOUND if necessary
    }
  
    //{"id": "1a23b..." , "userName" : "myUserName" , "firstName" : "myFirstName" , "lastName" : "myLastName" , "email" : "aaa.bbb@xyz.com" , "newPassword" : "pwd" , "mainGroup" : "myMainGroup"}
    @Put(':id') //or @Patch(':id')
    @Public()
     //@HttpCode(204) if no return updeted value as json object
    async update(@Body() userToUpdate: UserL1Dto, @Param('id') id:string): Promise<UserL1Dto> {
        return  this.userService.update(id, userToUpdate); //updatedUser as Promise
        //ErrorExceptionFilter may return NOT_FOUND if necessary
    }
      
}
