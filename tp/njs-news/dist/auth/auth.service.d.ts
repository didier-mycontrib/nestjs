import { UsersService } from 'src/users/users.service';
import { LoginRequest, LoginResponse } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(loginRequest: LoginRequest): Promise<LoginResponse>;
}
