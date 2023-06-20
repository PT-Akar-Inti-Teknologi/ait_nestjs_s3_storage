import { Inject, Injectable } from '@nestjs/common';
import { getS3ConnectionToken } from '../utils/tokenizer';
import {
  S3,
  CompleteMultipartUploadCommandOutput,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import {
  UploadFileParams,
  UploadFileReturns,
} from '../interfaces/upload-file.interface';
import { Readable } from 'stream';

@Injectable()
export class S3Service {
  constructor(@Inject(getS3ConnectionToken()) private readonly s3: S3) {}

  public async uploadFile(
    options: UploadFileParams
  ): Promise<UploadFileReturns> {
    try {
      const upload = await new Upload({
        client: this.s3,
        params: options,
      }).done();

      const res = upload as CompleteMultipartUploadCommandOutput;

      return {
        bucket: res.Bucket,
        key: res.Key,
        tag: res.ETag,
        location: res.Location,
      };
    } catch (error) {
      throw error;
    }
  }

  public async getFile(key: string, bucket: string) {
    try {
      const result = await this.s3.getObject({ Key: key, Bucket: bucket });
      if (!result.Body) throw new Error('Unknown Stream Type');

      return Buffer.from(result.Body.toString());
    } catch (error) {
      throw error;
    }
  }
}
