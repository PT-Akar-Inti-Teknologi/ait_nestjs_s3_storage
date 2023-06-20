import { Inject, Injectable } from '@nestjs/common';
import { getS3ConnectionToken } from '../utils/tokenizer';
import { S3, CompleteMultipartUploadCommandOutput } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { UploadFileParams } from '../interfaces/upload-file-params.interface';

@Injectable()
export class S3Service {
  constructor(@Inject(getS3ConnectionToken()) private readonly s3: S3) {}

  public async uploadFile(
    options: UploadFileParams
  ): Promise<CompleteMultipartUploadCommandOutput> {
    try {
      const upload = new Upload({
        client: this.s3,
        params: options,
      });

      return upload.done();
    } catch (error) {
      throw error;
    }
  }
}
