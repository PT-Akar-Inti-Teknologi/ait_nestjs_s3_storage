export { S3Service } from './services/s3.service';
export { AitS3Module } from './ioc/s3.module';
export { getS3ConnectionToken, getS3OptionToken } from './utils/tokenizer';
export {
  UploadFileParams,
  UploadFileReturns,
} from './interfaces/upload-file.interface';
export {
  S3_CONNECTION_TOKEN,
  S3_MODULE_CONNECTION,
  S3_MODULE_OPTIONS_TOKEN,
} from './constants/s3.constant';
