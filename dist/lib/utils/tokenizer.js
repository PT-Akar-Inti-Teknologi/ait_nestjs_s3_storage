"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getS3ConnectionToken = exports.getS3OptionToken = void 0;
const s3_constant_1 = require("../constants/s3.constant");
function getS3OptionToken(connection) {
    return `${connection || s3_constant_1.S3_MODULE_CONNECTION}_${s3_constant_1.S3_MODULE_OPTIONS_TOKEN}`;
}
exports.getS3OptionToken = getS3OptionToken;
function getS3ConnectionToken(connection) {
    return `${connection || s3_constant_1.S3_MODULE_CONNECTION}_${s3_constant_1.S3_CONNECTION_TOKEN}`;
}
exports.getS3ConnectionToken = getS3ConnectionToken;
