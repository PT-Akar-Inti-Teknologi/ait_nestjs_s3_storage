"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStorageConnectionToken = exports.getStorageOptionToken = void 0;
const token_constant_1 = require("../constants/token.constant");
function getStorageOptionToken(connection) {
    return `${connection || token_constant_1.STORAGE_MODULE_CONNECTION}_${token_constant_1.STORAGE_MODULE_OPTIONS_TOKEN}`;
}
exports.getStorageOptionToken = getStorageOptionToken;
function getStorageConnectionToken(connection) {
    return `${connection || token_constant_1.STORAGE_MODULE_CONNECTION}_${token_constant_1.STORAGE_CONNECTION_TOKEN}`;
}
exports.getStorageConnectionToken = getStorageConnectionToken;
