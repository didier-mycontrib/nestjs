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
exports.NewsL1Dto = exports.NewsL0Dto = void 0;
const classes_1 = require("@automapper/classes");
const swagger_1 = require("@nestjs/swagger");
class NewsL0Dto {
    constructor(title = "?", text = "?", timestamp = "?") {
        this.title = title;
        this.text = text;
        this.timestamp = timestamp;
    }
}
exports.NewsL0Dto = NewsL0Dto;
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'newsTitle' }),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], NewsL0Dto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'text of news' }),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], NewsL0Dto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, default: (new Date()).toISOString() }),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], NewsL0Dto.prototype, "timestamp", void 0);
class NewsL1Dto extends NewsL0Dto {
    constructor(id = "?", title = "?", text = "?", timestamp = "?") {
        super(title, text, timestamp);
        this.id = id;
    }
}
exports.NewsL1Dto = NewsL1Dto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], NewsL1Dto.prototype, "id", void 0);
//# sourceMappingURL=news.dto.js.map