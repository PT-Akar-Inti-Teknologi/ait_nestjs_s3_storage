import { StorageError } from './storage.error';

export class DeleteError extends StorageError {
  public message: string = 'Error deleting file';
}
