"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsSchema = void 0;
const mongoose = require("mongoose");
exports.NewsSchema = new mongoose.Schema({
    title: String,
    text: String,
    timestamp: String,
});
//# sourceMappingURL=news.schema.doc.js.map