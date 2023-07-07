import { StorageError } from './storage.error';

export class UploadError extends StorageError {
  public message: string = 'Error uploading object';
}
