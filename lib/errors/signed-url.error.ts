import { StorageError } from './storage.error';

export class SignedUrlError extends StorageError {
  public message: string = 'Error creating file url';
}
