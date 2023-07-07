import { StorageError } from './storage.error';

export class DownloadError extends StorageError {
  public message: string = 'Error downloading file';
}
