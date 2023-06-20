"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const s3_module_1 = require("./ioc/s3.module");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            s3_module_1.AitS3Module.forRootAsync({
                imports: [config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' })],
                inject: [config_1.ConfigService],
                useFactory: (env) => ({
                    config: {
                        credentials: {
                            accessKeyId: env.get('S3_ACCESS_KEY_ID'),
                            secretAccessKey: env.get('S3_SECRET_ACCESS_KEY'),
                        },
                        region: env.get('S3_REGION'),
                    },
                }),
            }),
        ],
    })
], AppModule);
exports.AppModule = AppModule;
