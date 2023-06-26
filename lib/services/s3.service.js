"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.push(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.push(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
var common_1 = require("@nestjs/common");
var client_s3_1 = require("@aws-sdk/client-s3");
var lib_storage_1 = require("@aws-sdk/lib-storage");
var s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
var S3Service = exports.S3Service = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var S3Service = _classThis = /** @class */ (function () {
        function S3Service_1(s3) {
            this.s3 = s3;
        }
        /**
         * @description Upload your file to your s3 bucket
         * @param options
         * @returns
         */
        S3Service_1.prototype.uploadFile = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var upload, res, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, new lib_storage_1.Upload({
                                    client: this.s3,
                                    params: options,
                                }).done()];
                        case 1:
                            upload = _a.sent();
                            res = upload;
                            return [2 /*return*/, {
                                    bucket: res.Bucket,
                                    key: res.Key,
                                    tag: res.ETag,
                                    location: res.Location,
                                }];
                        case 2:
                            error_1 = _a.sent();
                            throw error_1;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         *
         * @param key
         * @param bucket
         * @returns
         */
        S3Service_1.prototype.getFile = function (key, bucket) {
            return __awaiter(this, void 0, void 0, function () {
                var result, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.s3.getObject({ Key: key, Bucket: bucket })];
                        case 1:
                            result = _a.sent();
                            if (!result.Body)
                                throw new Error('Unknown Stream Type');
                            return [2 /*return*/, result];
                        case 2:
                            error_2 = _a.sent();
                            throw error_2;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         *
         * @param key
         * @param bucket
         * @param expiresIn
         * @returns
         */
        S3Service_1.prototype.getSignedFileUrl = function (key, bucket, expiresIn) {
            return __awaiter(this, void 0, void 0, function () {
                var command, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            command = new client_s3_1.GetObjectCommand({
                                Key: key,
                                Bucket: bucket
                            });
                            return [4 /*yield*/, (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: expiresIn })];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            error_3 = _a.sent();
                            throw error_3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        S3Service_1.prototype.deleteFile = function (key, bucket) {
            return __awaiter(this, void 0, void 0, function () {
                var command, result, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            command = new client_s3_1.DeleteObjectCommand({
                                Bucket: bucket,
                                Key: key
                            });
                            return [4 /*yield*/, this.s3.send(command)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, Boolean(result.DeleteMarker)];
                        case 2:
                            error_4 = _a.sent();
                            throw error_4;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return S3Service_1;
    }());
    __setFunctionName(_classThis, "S3Service");
    (function () {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        S3Service = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return S3Service = _classThis;
}();
