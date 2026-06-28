"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./instrument");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const compression_1 = __importDefault(require("compression"));
const app_module_1 = require("./app.module");
const all_exception_filter_1 = require("./common/filters/all-exception.filter");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.use((0, compression_1.default)());
    app.use((0, cookie_parser_1.default)());
    const allowedOrigins = [
        'http://localhost:3001',
        ...(process.env.FRONTEND_URL?.split(',').map(s => s.trim()) ?? []),
    ].filter(Boolean);
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
                callback(new Error(`CORS blocked: ${origin}`));
            }
        },
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new all_exception_filter_1.AllExceptionFilter());
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor(), new transform_interceptor_1.TransformInterceptor());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Mamabear API')
        .setDescription('Mamabear E-Commerce REST API')
        .setVersion('1.1')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`=======================================================`);
    console.log(`🚀 Backend running on: http://localhost:${port}`);
    console.log(`📘 Swagger Docs: http://localhost:${port}/api/docs`);
    console.log(`🌐 Allowed Origins: ${allowedOrigins.join(', ')}`);
    console.log(`=======================================================`);
}
process.env.TZ = 'Asia/Jakarta';
bootstrap();
//# sourceMappingURL=main.js.map