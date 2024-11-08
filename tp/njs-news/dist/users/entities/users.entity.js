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
exports.UserSchema = exports.UserEntity = void 0;
const classes_1 = require("@automapper/classes");
const mongoose_1 = require("@nestjs/mongoose");
let UserEntity = class UserEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, mongoose_1.Prop)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserEntity.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserEntity.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserEntity.prototype, "newPassword", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UserEntity.prototype, "mainGroup", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, mongoose_1.Schema)()
], UserEntity);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(UserEntity);
//# sourceMappingURL=users.entity.js.map