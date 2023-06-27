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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const tokenizer_1 = require("../utils/tokenizer");
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const timekeeper_1 = require("timekeeper");
let StorageService = class StorageService {
    constructor(s3Connection, storageOption) {
        this.s3Connection = s3Connection;
        this.storageOption = storageOption;
    }
    uploadFile(param) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const upload = (yield new lib_storage_1.Upload({
                    client: this.s3Connection,
                    params: {
                        Bucket: this.storageOption.bucket,
                        Key: param.filename,
                        Body: param.fileBuffer,
                    },
                }).done());
                return {
                    filename: upload.Key,
                    location: upload.Location,
                    tag: upload.ETag,
                };
            }
            catch (error) {
                throw {
                    message: 'Failed uploading object',
                    error,
                    param,
                };
            }
        });
    }
    getTruncatedTime() {
        const currentTime = new Date();
        const d = new Date(currentTime.setMinutes(currentTime.getMinutes() - 5));
        d.setMinutes(Math.floor(d.getMinutes() / 10) * 10);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d;
    }
    getCacheableSignedUrl(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = yield (0, timekeeper_1.withFreeze)(this.getTruncatedTime(), () => this.getSignedUrl(filename));
                return file;
            }
            catch (error) {
                throw {
                    message: 'Failed creating cacheable url',
                    error,
                    filename,
                };
            }
        });
    }
    getFile(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.s3Connection.getObject({
                    Key: filename,
                    Bucket: this.storageOption.bucket,
                });
                return result.Body;
            }
            catch (error) {
                throw {
                    message: 'Failed downloading object',
                    error,
                    filename,
                };
            }
        });
    }
    getSignedUrl(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const command = new client_s3_1.GetObjectCommand({
                    Key: filename,
                    Bucket: this.storageOption.bucket,
                });
                return yield (0, s3_request_presigner_1.getSignedUrl)(this.s3Connection, command, {
                    expiresIn: this.storageOption.signedExpiration,
                });
            }
            catch (error) {
                throw {
                    message: 'Failed creating url',
                    error,
                    filename,
                };
            }
        });
    }
    deleteFile(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const command = new client_s3_1.DeleteObjectCommand({
                    Bucket: this.storageOption.bucket,
                    Key: filename,
                });
                const result = yield this.s3Connection.send(command);
                return Boolean(result.DeleteMarker);
            }
            catch (error) {
                throw error;
            }
        });
    }
};
StorageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, tokenizer_1.getStorageConnectionToken)())),
    __param(1, (0, common_1.Inject)((0, tokenizer_1.getStorageOptionToken)())),
    __metadata("design:paramtypes", [client_s3_1.S3, Object])
], StorageService);
exports.StorageService = StorageService;
