import { CompleteMultipartUploadCommandOutput } from '@aws-sdk/client-s3';

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
