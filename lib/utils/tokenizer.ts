import {
  STORAGE_MODULE_CONNECTION,
  STORAGE_MODULE_OPTIONS_TOKEN,
  STORAGE_CONNECTION_TOKEN,
} from '../constants/token.constant';

export function getStorageOptionToken(connection?: string): string {
  return `${connection || STORAGE_MODULE_CONNECTION}_${STORAGE_MODULE_OPTIONS_TOKEN}`;
}

export function getStorageConnectionToken(connection?: string): string {
  return `${connection || STORAGE_MODULE_CONNECTION}_${STORAGE_CONNECTION_TOKEN}`;
}
