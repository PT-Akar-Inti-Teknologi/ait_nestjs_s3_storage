"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var AitS3Module_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AitS3Module = void 0;
const common_1 = require("@nestjs/common");
const tokenizer_1 = require("../utils/tokenizer");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_service_1 = require("../services/s3.service");
let AitS3Module = AitS3Module_1 = class AitS3Module {
    static forRoot(options, connection) {
        const s3ConnectionProvider = {
            provide: (0, tokenizer_1.getS3ConnectionToken)(connection),
            useValue: new client_s3_1.S3({
                region: options.config.region,
                credentials: options.config.credentials,
                forcePathStyle: true,
            }),
            inject: [(0, tokenizer_1.getS3OptionToken)(connection)],
        };
        const s3OptionsProvider = {
            provide: (0, tokenizer_1.getS3OptionToken)(connection),
            useValue: options,
        };
        return {
            module: AitS3Module_1,
            providers: [s3ConnectionProvider, s3OptionsProvider, s3_service_1.S3Service],
            exports: [s3_service_1.S3Service],
        };
    }
    static forRootAsync(options, connection) {
        const s3ConnectionProvider = {
            provide: (0, tokenizer_1.getS3ConnectionToken)(connection),
            useFactory(options) {
                return new client_s3_1.S3(options);
            },
            inject: [(0, tokenizer_1.getS3OptionToken)(connection)],
        };
        return {
            module: AitS3Module_1,
            imports: options.imports,
            providers: [
                ...this.createAsyncProviders(options, connection),
                s3ConnectionProvider,
                s3_service_1.S3Service,
            ],
            exports: [s3ConnectionProvider, s3_service_1.S3Service],
        };
    }
    static createAsyncProviders(options, connection) {
        if (!(options.useExisting || options.useFactory || options.useClass)) {
            throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
        }
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options, connection)];
        }
        return [
            this.createAsyncOptionsProvider(options, connection),
            { provide: options.useClass, useClass: options.useClass },
        ];
    }
    static createAsyncOptionsProvider(options, connection) {
        if (!(options.useExisting || options.useFactory || options.useClass)) {
            throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
        }
        if (options.useFactory) {
            return {
                provide: (0, tokenizer_1.getS3OptionToken)(connection),
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: (0, tokenizer_1.getS3OptionToken)(connection),
            useFactory(optionsFactory) {
                return __awaiter(this, void 0, void 0, function* () {
                    return optionsFactory.createS3ModuleOptions();
                });
            },
            inject: [options.useClass || options.useExisting],
        };
    }
};
AitS3Module = AitS3Module_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], AitS3Module);
exports.AitS3Module = AitS3Module;
