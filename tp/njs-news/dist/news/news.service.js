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
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const news_entity_1 = require("./entities/news.entity");
const news_dto_1 = require("./dto/news.dto");
const nestjs_1 = require("@automapper/nestjs");
let NewsService = class NewsService {
    constructor(newsModel, classMapper) {
        this.newsModel = newsModel;
        this.classMapper = classMapper;
    }
    async findAll() {
        const newsDocArray = await this.newsModel.find().exec();
        return this.classMapper.mapArrayAsync(newsDocArray, news_entity_1.NewsEntity, news_dto_1.NewsL1Dto);
    }
    async findOne(id) {
        try {
            const newsDoc = await this.newsModel.findOne({ _id: id }).exec();
            return this.classMapper.mapAsync(newsDoc, news_entity_1.NewsEntity, news_dto_1.NewsL1Dto);
        }
        catch (ex) {
            throw new Error(`NOT_FOUND: news not found with id=${id}`);
        }
    }
    async create(news) {
        const newsToCreate = news;
        const persistentNewsEntity = new this.newsModel(newsToCreate);
        const savedNewsAsNewsEntity = await persistentNewsEntity.save();
        return this.classMapper.mapAsync(savedNewsAsNewsEntity, news_entity_1.NewsEntity, news_dto_1.NewsL1Dto);
    }
    async remove(id) {
        const doesNewsExit = await this.newsModel.exists({ _id: id });
        if (!doesNewsExit)
            throw new Error(`NOT_FOUND: not existing news to delete with id==${id}`);
        try {
            return await this.newsModel.findByIdAndDelete(id);
        }
        catch (ex) {
            throw new Error(`Exception in NewsService.remove() with id==${id}`);
        }
    }
    async update(id, newsDto) {
        const newsToUpdate = newsDto;
        const updatedNewsAsNewsEntity = await this.newsModel.findByIdAndUpdate(id, newsToUpdate, { newsToUpdate: true });
        if (updatedNewsAsNewsEntity == undefined)
            throw new Error(`NOT_FOUND: not existing news to update with id=${id}`);
        return this.classMapper.mapAsync(updatedNewsAsNewsEntity, news_entity_1.NewsEntity, news_dto_1.NewsL1Dto);
    }
};
exports.NewsService = NewsService;
exports.NewsService = NewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('News')),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [mongoose_1.Model, Object])
], NewsService);
//# sourceMappingURL=news.service.js.map