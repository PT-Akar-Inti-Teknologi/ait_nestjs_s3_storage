import { UploadFileParam, UploadFileReturn } from './upload-file.interface';
import { Readable } from 'stream';

export type GetFileReturn = string | Buffer | Readable | String;

export interface IStorageService {
  uploadFile(param: UploadFileParam): Promise<UploadFileReturn>;
  getFile(filename: string): Promise<GetFileReturn>;
  getSignedUrl(filename: string): Promise<string>;
  deleteFile(filename: string): Promise<boolean>;
}
