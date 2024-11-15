import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/auth.dto';
import { Message } from 'src/common/message';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  @Public()
  login(@Body() loginRequest:LoginRequest) {
    return this.authService.login(loginRequest);
    /*if (loginResponse.status==false) {
      throw new UnauthorizedException();
    }*/
   //loginResponse/200 may contains .status=false .message="login failed" and .token=null
  }

  //@UseGuards(AuthGuard) //if no globally registered & used
  @Get('confidentialInfos')
  getConfidentialInfos(){
    return new Message("confidential Infos only for authenticated users");
  }
}
