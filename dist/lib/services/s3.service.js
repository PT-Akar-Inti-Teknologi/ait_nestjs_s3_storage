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
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const tokenizer_1 = require("../utils/tokenizer");
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
let S3Service = class S3Service {
    constructor(s3) {
        this.s3 = s3;
    }
    uploadFile(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const upload = yield new lib_storage_1.Upload({
                    client: this.s3,
                    params: options,
                }).done();
                const res = upload;
                return {
                    bucket: res.Bucket,
                    key: res.Key,
                    tag: res.ETag,
                    location: res.Location,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    getFile(key, bucket) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.s3.getObject({ Key: key, Bucket: bucket });
                if (!result.Body)
                    throw new Error('Unknown Stream Type');
                return result.Body.transformToWebStream();
            }
            catch (error) {
                throw error;
            }
        });
    }
};
S3Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, tokenizer_1.getS3ConnectionToken)())),
    __metadata("design:paramtypes", [client_s3_1.S3])
], S3Service);
exports.S3Service = S3Service;
