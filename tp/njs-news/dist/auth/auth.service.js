"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const auth_dto_1 = require("./dto/auth.dto");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async login(loginRequest) {
        const user = await this.usersService.findByUsername(loginRequest.username);
        const cryptedPassword = user.newPassword;
        const isMatch = await bcrypt.compare(loginRequest.password, cryptedPassword ?? "");
        let loginResponse = new auth_dto_1.LoginResponse(loginRequest.username);
        if (isMatch) {
            loginResponse.status = true;
            loginResponse.message = "successful login";
            switch (user.mainGroup) {
                case "admin_of_sandboxrealm":
                    loginResponse.scope = "resource.read resource.write resource.delete";
                    break;
                case "manager_of_sandboxrealm":
                    loginResponse.scope = "resource.read resource.write";
                    break;
                case "user_of_sandboxrealm":
                default:
                    loginResponse.scope = "resource.read";
            }
            const jwtPayload = { sub: user.id, username: user.username,
                scope: loginResponse.scope, name: `${user.firstName} ${user.lastName}` };
            loginResponse.token = await this.jwtService.signAsync(jwtPayload);
        }
        else {
            loginResponse.status = false;
            loginResponse.message = "login failed";
            loginResponse.token = null;
        }
        return loginResponse;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map