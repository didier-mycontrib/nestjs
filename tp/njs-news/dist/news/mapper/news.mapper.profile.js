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
exports.NewsMapperProfile = void 0;
const core_1 = require("@automapper/core");
const nestjs_1 = require("@automapper/nestjs");
const common_1 = require("@nestjs/common");
const news_dto_1 = require("../dto/news.dto");
const news_entity_1 = require("../entities/news.entity");
let NewsMapperProfile = class NewsMapperProfile extends nestjs_1.AutomapperProfile {
    constructor(mapper) {
        super(mapper);
    }
    get profile() {
        return (mapper) => {
            (0, core_1.createMap)(mapper, news_dto_1.NewsL0Dto, news_entity_1.NewsEntity);
            (0, core_1.createMap)(mapper, news_dto_1.NewsL1Dto, news_entity_1.NewsEntity);
            (0, core_1.createMap)(mapper, news_entity_1.NewsEntity, news_dto_1.NewsL1Dto, (0, core_1.forMember)(d => d.id, (0, core_1.mapFrom)(s => s.id)));
        };
    }
};
exports.NewsMapperProfile = NewsMapperProfile;
exports.NewsMapperProfile = NewsMapperProfile = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [Object])
], NewsMapperProfile);
//# sourceMappingURL=news.mapper.profile.js.map