export interface FunctionWithClass<T> extends Function {
  new (...args: any[]): T;
}
