import { AuthService } from './auth.service';
import { LoginRequest } from './dto/auth.dto';
import { Message } from 'src/common/message';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginRequest: LoginRequest): Promise<import("./dto/auth.dto").LoginResponse>;
    getConfidentialInfos(): Message;
}
