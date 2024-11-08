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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const nestjs_1 = require("@automapper/nestjs");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_dto_1 = require("./dto/users.dto");
const users_entity_1 = require("./entities/users.entity");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userModel, classMapper) {
        this.userModel = userModel;
        this.classMapper = classMapper;
    }
    async findAll() {
        const userDocArray = await this.userModel.find().exec();
        return this.classMapper.mapArrayAsync(userDocArray, users_entity_1.UserEntity, users_dto_1.UserL1Dto);
    }
    async findOne(id) {
        try {
            const userDoc = await this.userModel.findOne({ _id: id }).exec();
            return this.classMapper.mapAsync(userDoc, users_entity_1.UserEntity, users_dto_1.UserL1Dto);
        }
        catch (ex) {
            throw new Error(`NOT_FOUND: user not found with id=${id}`);
        }
    }
    async findByUsername(username) {
        try {
            const userDoc = await this.userModel.findOne({ username: username }).exec();
            return this.classMapper.mapAsync(userDoc, users_entity_1.UserEntity, users_dto_1.UserL1Dto);
        }
        catch (ex) {
            throw new Error(`NOT_FOUND: user not found with username=${username}`);
        }
    }
    async bcryptPassword(password) {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }
    async create(user) {
        const userToCreate = user;
        let persistentUserEntity = new this.userModel(userToCreate);
        persistentUserEntity.newPassword = await this.bcryptPassword(persistentUserEntity.newPassword ?? "");
        const savedUserAsUserEntity = await persistentUserEntity.save();
        return this.classMapper.mapAsync(savedUserAsUserEntity, users_entity_1.UserEntity, users_dto_1.UserL1Dto);
    }
    async remove(id) {
        const doesUserExit = await this.userModel.exists({ _id: id });
        if (!doesUserExit)
            throw new Error(`NOT_FOUND: not existing user to delete with id==${id}`);
        try {
            return await this.userModel.findByIdAndDelete(id);
        }
        catch (ex) {
            throw new Error(`Exception in UserService.remove() with id==${id}`);
        }
    }
    async update(id, userDto) {
        const userToUpdate = userDto;
        if (userToUpdate.newPassword != null && userToUpdate.newPassword.charAt(0) != '')
            userToUpdate.newPassword = await this.bcryptPassword(userToUpdate.newPassword ?? "");
        const updatedUserAsUserEntity = await this.userModel.findByIdAndUpdate(id, userToUpdate, { userToUpdate: true });
        if (updatedUserAsUserEntity == undefined)
            throw new Error(`NOT_FOUND: not existing user to update with id=${id}`);
        return this.classMapper.mapAsync(updatedUserAsUserEntity, users_entity_1.UserEntity, users_dto_1.UserL1Dto);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Users')),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [mongoose_2.Model, Object])
], UsersService);
//# sourceMappingURL=users.service.js.map