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
const message_1 = require("../common/message");
const news_dto_1 = require("./dto/news.dto");
const error_exception_filter_1 = require("../common/error.exception.filter");
const public_decorator_1 = require("../auth/public.decorator");
const rolesOrScope_decorator_1 = require("../auth/rolesOrScope.decorator");
let NewsController = class NewsController {
    constructor(newsService) {
        this.newsService = newsService;
    }
    async getById(id) {
        return this.newsService.findOne(id);
    }
    async findByCriteria() {
        return this.newsService.findAll();
    }
    async create(news) {
        console.log("post/create newsDto=" + JSON.stringify(news));
        return this.newsService.create(news);
    }
    async remove(id) {
        let deletedNews = await this.newsService.remove(id);
        return new message_1.Message("news with id=" + id + " is now deleted");
    }
    async update(newsToUpdate, id) {
        return this.newsService.update(id, newsToUpdate);
    }
};
exports.NewsController = NewsController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "findByCriteria", null);
__decorate([
    (0, common_1.Post)(),
    (0, rolesOrScope_decorator_1.HasScopes)("resource.write"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [news_dto_1.NewsL0Dto]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [news_dto_1.NewsL1Dto, String]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "update", null);
exports.NewsController = NewsController = __decorate([
    (0, common_1.Controller)('news'),
    (0, common_1.UseFilters)(new error_exception_filter_1.ErrorExceptionFilter(), new error_exception_filter_1.HttpExceptionFilter()),
    __metadata("design:paramtypes", [news_service_1.NewsService])
], NewsController);
//# sourceMappingURL=news.controller.js.map