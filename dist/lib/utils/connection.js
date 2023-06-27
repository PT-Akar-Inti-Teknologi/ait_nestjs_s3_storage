"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionFactory = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
function createS3ConnectionFactory(options) {
    try {
        const client = new client_s3_1.S3({
            credentials: {
                accessKeyId: options.accessKeyId,
                secretAccessKey: options.secretAccessKey,
            },
            region: options.region
        });
        return client;
    }
    catch (error) {
        throw new Error(error);
    }
}
function connectionFactory(options) {
    const type = options.type;
    const connections = {
        s3: createS3ConnectionFactory,
        azure: (options) => { throw new Error(`No connection provided for ${options.type}`); }
    };
    return connections[type];
}
exports.connectionFactory = connectionFactory;
