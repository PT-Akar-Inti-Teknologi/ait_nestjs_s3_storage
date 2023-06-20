import { S3, CompleteMultipartUploadCommandOutput } from '@aws-sdk/client-s3';
import { UploadFileParams } from '../interfaces/upload-file-params.interface';
export declare class S3Service {
    private readonly s3;
    constructor(s3: S3);
    uploadFile(options: UploadFileParams): Promise<CompleteMultipartUploadCommandOutput>;
}
