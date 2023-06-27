import { GetFileReturn, IStorageService } from '../interfaces/storage.service.interface';
import { S3 } from '@aws-sdk/client-s3';
import { ModuleConfig } from '../interfaces/module-config.interface';
import { UploadFileParam, UploadFileReturn } from '../interfaces/upload-file.interface';
export declare class StorageService implements IStorageService {
    private readonly s3Connection;
    private readonly storageOption;
    constructor(s3Connection: S3, storageOption: ModuleConfig);
    uploadFile(param: UploadFileParam): Promise<UploadFileReturn>;
    private getTruncatedTime;
    getCacheableSignedUrl(filename: string): Promise<string>;
    getFile(filename: string): Promise<GetFileReturn>;
    getSignedUrl(filename: string): Promise<string>;
    deleteFile(filename: string): Promise<boolean>;
}
