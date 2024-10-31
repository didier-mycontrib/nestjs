"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewsDto = toNewsDto;
exports.toNewsDtoArray = toNewsDtoArray;
exports.fromNewsDto = fromNewsDto;
const news_dto_1 = require("./news.dto");
function toNewsDto(n) {
    return new news_dto_1.NewsDto(n.id, n.title, n.text, n.timestamp);
}
function toNewsDtoArray(nArray) {
    let nDtos = [];
    for (let n of nArray)
        nDtos.push(new news_dto_1.NewsDto(n.id, n.title, n.text, n.timestamp));
    return nDtos;
}
function fromNewsDto(n) {
    return { id: n.id,
        title: n.title,
        text: n.text,
        timestamp: n.timestamp };
}
//# sourceMappingURL=news.mapper.js.map