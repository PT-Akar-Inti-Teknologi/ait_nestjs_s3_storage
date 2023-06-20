import {
  S3_MODULE_CONNECTION,
  S3_MODULE_OPTIONS_TOKEN,
  S3_CONNECTION_TOKEN,
} from '../constants/s3.constant';

export function getS3OptionToken(connection?: string): string {
  return `${connection || S3_MODULE_CONNECTION}_${S3_MODULE_OPTIONS_TOKEN}`;
}

export function getS3ConnectionToken(connection?: string): string {
  return `${connection || S3_MODULE_CONNECTION}_${S3_CONNECTION_TOKEN}`;
}
