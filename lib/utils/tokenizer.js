"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getS3ConnectionToken = exports.getS3OptionToken = void 0;
var s3_constant_1 = require("../constants/s3.constant");
function getS3OptionToken(connection) {
    return "".concat(connection || s3_constant_1.S3_MODULE_CONNECTION, "_").concat(s3_constant_1.S3_MODULE_OPTIONS_TOKEN);
}
exports.getS3OptionToken = getS3OptionToken;
function getS3ConnectionToken(connection) {
    return "".concat(connection || s3_constant_1.S3_MODULE_CONNECTION, "_").concat(s3_constant_1.S3_CONNECTION_TOKEN);
}
exports.getS3ConnectionToken = getS3ConnectionToken;
