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
exports.LoginResponse = exports.LoginRequest = void 0;
const classes_1 = require("@automapper/classes");
const swagger_1 = require("@nestjs/swagger");
class LoginRequest {
    constructor(username = "myUsername", password = "pwd") {
        this.username = username;
        this.password = password;
    }
}
exports.LoginRequest = LoginRequest;
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'myUsername' }),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], LoginRequest.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'pwd' }),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], LoginRequest.prototype, "password", void 0);
class LoginResponse {
    constructor(username = "myUsername") {
        this.username = username;
    }
}
exports.LoginResponse = LoginResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'myUsername' }),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], LoginResponse.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'successfull login OR login failed' }),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], LoginResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: false }),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Boolean)
], LoginResponse.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: null }),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], LoginResponse.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: null }),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Object)
], LoginResponse.prototype, "scope", void 0);
//# sourceMappingURL=auth.dto.js.map