export class StorageError {
  public message: string;
  public param: any;
  public error: any;

  constructor(param: any, error: any, message?: string) {
    this.message = this.message ?? message;
    this.param = param;
    this.error = error;
  }
}
