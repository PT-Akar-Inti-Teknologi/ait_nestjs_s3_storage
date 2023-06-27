export interface UploadFileParam {
  fileBuffer: Buffer;
  filename: string;
  referenceId: string;
  directory?: string;
}

export interface UploadFileReturn {
  filename: string;
  location: string;
  tag?: string;
}
