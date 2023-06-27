import { Inject, Injectable } from '@nestjs/common';
import {
  GetFileReturn,
  IStorageService,
} from '../interfaces/storage.service.interface';
import {
  getStorageConnectionToken,
  getStorageOptionToken,
} from '../utils/tokenizer';
import {
  CompleteMultipartUploadCommandOutput,
  DeleteObjectCommand,
  GetObjectCommand,
  S3,
} from '@aws-sdk/client-s3';
import { ModuleConfig } from '../interfaces/module-config.interface';
import {
  UploadFileParam,
  UploadFileReturn,
} from '../interfaces/upload-file.interface';
import { Upload } from '@aws-sdk/lib-storage';
import { Readable } from 'stream';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { withFreeze } from 'timekeeper';

@Injectable()
export class StorageService implements IStorageService {
  constructor(
    @Inject(getStorageConnectionToken()) private readonly s3Connection: S3,
    @Inject(getStorageOptionToken())
    private readonly storageOption: ModuleConfig
  ) {}

  async uploadFile(param: UploadFileParam): Promise<UploadFileReturn> {
    try {
      const upload = (await new Upload({
        client: this.s3Connection,
        params: {
          Bucket: this.storageOption.bucket,
          Key: param.filename,
          Body: param.fileBuffer,
        },
      }).done()) as CompleteMultipartUploadCommandOutput;

      return {
        filename: upload.Key,
        location: upload.Location,
        tag: upload.ETag,
      };
    } catch (error) {
      throw {
        message: 'Failed uploading object',
        error,
        param,
      };
    }
  }

  private getTruncatedTime() {
    const currentTime = new Date();
    const d = new Date(currentTime.setMinutes(currentTime.getMinutes() - 5));

    d.setMinutes(Math.floor(d.getMinutes() / 10) * 10);
    d.setSeconds(0);
    d.setMilliseconds(0);

    return d;
  }

  async getCacheableSignedUrl(filename: string) {
    try {
      const file = await withFreeze(this.getTruncatedTime(), () =>
        this.getSignedUrl(filename)
      );

      return file;
    } catch (error) {
      throw {
        message: 'Failed creating cacheable url',
        error,
        filename,
      };
    }
  }

  async getFile(filename: string): Promise<GetFileReturn> {
    try {
      const result = await this.s3Connection.getObject({
        Key: filename,
        Bucket: this.storageOption.bucket,
      });

      return result.Body as Readable;
    } catch (error) {
      throw {
        message: 'Failed downloading object',
        error,
        filename,
      };
    }
  }

  async getSignedUrl(filename: string): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Key: filename,
        Bucket: this.storageOption.bucket,
      });

      return await getSignedUrl(this.s3Connection, command, {
        expiresIn: this.storageOption.signedExpiration,
      });
    } catch (error) {
      throw {
        message: 'Failed creating url',
        error,
        filename,
      };
    }
  }

  async deleteFile(filename: string): Promise<boolean> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.storageOption.bucket,
        Key: filename,
      });

      const result = await this.s3Connection.send(command);

      return Boolean(result.DeleteMarker);
    } catch (error) {
      throw error;
    }
  }
}
