import { Inject, Injectable } from '@nestjs/common';
import { getS3ConnectionToken } from '../utils/tokenizer';
import {
  S3,
  CompleteMultipartUploadCommandOutput,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import {
  UploadFileParams,
  UploadFileReturns,
} from '../interfaces/upload-file.interface';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  constructor(@Inject(getS3ConnectionToken()) private readonly s3: S3) {}

  /**
   * @description Upload your file to your s3 bucket
   * @param options
   * @returns
   */
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

  /**
   * 
   * @param key 
   * @param bucket 
   * @returns 
   */
  public async getFile(key: string, bucket: string) {
    try {
      const result = await this.s3.getObject({ Key: key, Bucket: bucket });
      if (!result.Body) throw new Error('Unknown Stream Type');

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 
   * @param key 
   * @param bucket 
   * @param expiresIn 
   * @returns 
   */
  public async getSignedFileUrl(key: string, bucket: string, expiresIn: number) {
    try {
      const command = new GetObjectCommand({
        Key: key,
        Bucket: bucket
      })

      return await getSignedUrl(this.s3, command, {expiresIn})
    } catch (error) {
      throw error
    }
  }

  public async deleteFile(key: string, bucket: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: bucket,
        Key: key
      })

      const result = await this.s3.send(command)

      return Boolean(result.DeleteMarker)
    } catch (error) {
      throw error
    }
  }
}
