import { S3 } from '@aws-sdk/client-s3';
import { UploadFileParams, UploadFileReturns } from '../interfaces/upload-file.interface';
export declare class S3Service {
    private readonly s3;
    constructor(s3: S3);
    uploadFile(options: UploadFileParams): Promise<UploadFileReturns>;
    getFile(key: string, bucket: string): Promise<import("@aws-sdk/client-s3").GetObjectCommandOutput>;
}
