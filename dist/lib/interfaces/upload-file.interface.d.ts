/// <reference types="node" />
export interface UploadFileParams {
    Body: Buffer;
    Key: string;
    UploadId: string;
    PartNumber: Number;
    Bucket: string;
}
export interface UploadFileReturns {
    key: string;
    bucket: string;
    tag: string;
    location: string;
}
