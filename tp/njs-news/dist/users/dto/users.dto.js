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
exports.UserL1Dto = exports.UserL0Dto = void 0;
const classes_1 = require("@automapper/classes");
const swagger_1 = require("@nestjs/swagger");
class UserL0Dto {
    constructor(username = "myUsername", firstName = "myFirstName", lastName = "myLastName", email = "aaa.bbb@xyz.com", newPassword = "pwd", mainGroup = "user_of_sandboxrealm") {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.newPassword = newPassword;
        this.mainGroup = mainGroup;
    }
}
exports.UserL0Dto = UserL0Dto;
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'myUsername' }),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserL0Dto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'myFirstName' }),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserL0Dto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'myLastName' }),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserL0Dto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'aaa.bbb@xyz.com' }),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserL0Dto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'pwd' }),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserL0Dto.prototype, "newPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'user_of_sandboxrealm' }),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserL0Dto.prototype, "mainGroup", void 0);
class UserL1Dto extends UserL0Dto {
    constructor(id = "?", username = "myUsername", firstName = "myFirstName", lastName = "myLastName", email = "aaa.bbb@xyz.com", newPassword = "pwd", mainGroup = "user_of_sandboxrealm") {
        super(username, firstName, lastName, email, newPassword, mainGroup);
        this.id = id;
    }
}
exports.UserL1Dto = UserL1Dto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserL1Dto.prototype, "id", void 0);
//# sourceMappingURL=users.dto.js.map