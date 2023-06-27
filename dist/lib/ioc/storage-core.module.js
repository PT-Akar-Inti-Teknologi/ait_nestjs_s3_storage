"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var StorageCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageCoreModule = void 0;
const common_1 = require("@nestjs/common");
const tokenizer_1 = require("../utils/tokenizer");
const connection_1 = require("../utils/connection");
let StorageCoreModule = StorageCoreModule_1 = class StorageCoreModule {
    static forRoot(options, connection) {
        const storageConnectionProvider = {
            provide: (0, tokenizer_1.getStorageConnectionToken)(connection),
            useValue: (0, connection_1.connectionFactory)(options),
        };
        const storageConnectionOptionProvider = {
            provide: (0, tokenizer_1.getStorageOptionToken)(connection),
            useValue: options,
        };
        return {
            module: StorageCoreModule_1,
            providers: [storageConnectionProvider, storageConnectionOptionProvider],
            exports: [storageConnectionProvider, storageConnectionOptionProvider],
        };
    }
    static forRootAsync(options, connection) {
        const storageConnectionProvider = {
            provide: (0, tokenizer_1.getStorageConnectionToken)(connection),
            useFactory: (options) => (0, connection_1.connectionFactory)(options),
            inject: [(0, tokenizer_1.getStorageOptionToken)(connection)],
        };
        return {
            module: StorageCoreModule_1,
            imports: options.imports,
            providers: [
                ...this.createAsyncProviders(options, connection),
                storageConnectionProvider,
            ],
            exports: [storageConnectionProvider],
        };
    }
    static createAsyncProviders(options, connection) {
        return [this.createAsyncOptionsProvider(options, connection)];
    }
    static createAsyncOptionsProvider(options, connection) {
        return {
            provide: (0, tokenizer_1.getStorageOptionToken)(connection),
            useFactory: options.useFactory,
            inject: options.inject || [],
        };
    }
};
StorageCoreModule = StorageCoreModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], StorageCoreModule);
exports.StorageCoreModule = StorageCoreModule;
