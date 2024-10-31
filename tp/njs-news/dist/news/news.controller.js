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
exports.NewsController = void 0;
const common_1 = require("@nestjs/common");
const news_service_1 = require("./news.service");
const news_dto_1 = require("./news.dto");
const message_1 = require("../common/message");
const news_mapper_1 = require("./news.mapper");
let NewsController = class NewsController {
    constructor(newsService) {
        this.newsService = newsService;
    }
    async getNewsById(id) {
        let news = await this.newsService.findOne(id);
        if (news == undefined)
            throw new common_1.HttpException('news not found with id=' + id, common_1.HttpStatus.NOT_FOUND);
        return (0, news_mapper_1.toNewsDto)(news);
    }
    async getNewsByCriteria() {
        const newsArray = await this.newsService.findAll();
        return (0, news_mapper_1.toNewsDtoArray)(newsArray);
    }
    async create(news) {
        const createadNews = await this.newsService.create(news);
        return (0, news_mapper_1.toNewsDto)(createadNews);
    }
    async delete(id) {
        let deleteOk = await this.newsService.delete(id);
        if (deleteOk == false)
            throw new common_1.HttpException('not existing news to delete with id=' + id, common_1.HttpStatus.NOT_FOUND);
        else
            return new message_1.Message("news with id=" + id + " is now deleted");
    }
    async update(newsToUpdate, id) {
        let updatedNews = await this.newsService.update(id, newsToUpdate);
        if (updatedNews == undefined)
            throw new common_1.HttpException('not existing news to update with id=' + id, common_1.HttpStatus.NOT_FOUND);
        return (0, news_mapper_1.toNewsDto)(updatedNews);
    }
};
exports.NewsController = NewsController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "getNewsById", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "getNewsByCriteria", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [news_dto_1.NewsDto]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [news_dto_1.NewsDto, String]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "update", null);
exports.NewsController = NewsController = __decorate([
    (0, common_1.Controller)('news'),
    __metadata("design:paramtypes", [news_service_1.NewsService])
], NewsController);
//# sourceMappingURL=news.controller.js.map