import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginRequest, LoginResponse } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,private jwtService: JwtService ) {
    }
  
  async login(loginRequest :LoginRequest): Promise<LoginResponse> {
    const user = await this.usersService.findByUsername(loginRequest.username);
    const cryptedPassword = user.newPassword;
    const isMatch = await bcrypt.compare(loginRequest.password, cryptedPassword??"");
    
    /*if (!isMatch) {
      throw new UnauthorizedException();
    }*/
   let loginResponse=new LoginResponse(loginRequest.username);
   if(isMatch){
     loginResponse.status=true; loginResponse.message="successful login";
     switch(user.mainGroup){
        case "admin_of_sandboxrealm":
            loginResponse.scope="resource.read resource.write resource.delete"; break;
        case "manager_of_sandboxrealm":
            loginResponse.scope="resource.read resource.write"; break;
        case "user_of_sandboxrealm":
        default:
            loginResponse.scope="resource.read";
    }
    const jwtPayload = { sub: user.id, username: user.username , 
                         scope: loginResponse.scope , name: `${user.firstName} ${user.lastName}` };
    loginResponse.token = await this.jwtService.signAsync(jwtPayload);
   }else{
     loginResponse.status=false; loginResponse.message="login failed";
     loginResponse.token=null;
   }
   return loginResponse;
  }

}