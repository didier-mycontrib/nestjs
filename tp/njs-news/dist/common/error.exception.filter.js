"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorExceptionFilter = exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        response
            .status(status)
            .json({
            statusCode: status,
            message: exception.message
        });
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
let ErrorExceptionFilter = class ErrorExceptionFilter {
    catch(error, host) {
        console.log("**** ErrorExceptionFilter ****");
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const fullMessage = error.message;
        const messageParts = fullMessage.split(':');
        const message = messageParts.length > 1 ? messageParts[1].trim() : fullMessage;
        const statusString = messageParts.length > 1 ? messageParts[0] : null;
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        switch (statusString) {
            case "NOT_FOUND":
                status = common_1.HttpStatus.NOT_FOUND;
                break;
        }
        response
            .status(status)
            .json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            message: message
        });
    }
};
exports.ErrorExceptionFilter = ErrorExceptionFilter;
exports.ErrorExceptionFilter = ErrorExceptionFilter = __decorate([
    (0, common_1.Catch)(Error)
], ErrorExceptionFilter);
//# sourceMappingURL=error.exception.filter.js.map