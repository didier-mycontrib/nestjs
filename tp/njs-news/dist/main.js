"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('news-api');
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('news api')
        .setDescription('Simple news rest api')
        .setVersion('1.0')
        .addTag('news')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('news-api/api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map