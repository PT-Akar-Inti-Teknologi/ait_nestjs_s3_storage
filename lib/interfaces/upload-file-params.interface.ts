export interface UploadFileParams {
  Body: Buffer;
  Key: string;
  UploadId: string;
  PartNumber: Number;
  Bucket: string;
}
