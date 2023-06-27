import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import {
  getStorageConnectionToken,
  getStorageOptionToken,
} from '../utils/tokenizer';
import {
  AsyncModuleConfig,
  ModuleConfig,
} from '../interfaces/module-config.interface';
import { connectionFactory } from '../utils/connection';

@Global()
@Module({})
export class StorageCoreModule {
  /* forRoot */
  static forRoot(options: ModuleConfig, connection?: string): DynamicModule {
    const storageConnectionProvider: Provider = {
      provide: getStorageConnectionToken(connection),
      useValue: connectionFactory(options),
    };

    const storageConnectionOptionProvider: Provider = {
      provide: getStorageOptionToken(connection),
      useValue: options,
    };

    return {
      module: StorageCoreModule,
      providers: [storageConnectionProvider, storageConnectionOptionProvider],
      exports: [storageConnectionProvider, storageConnectionOptionProvider],
    };
  }

  /* forRootAsync */
  static forRootAsync(
    options: AsyncModuleConfig,
    connection?: string
  ): DynamicModule {
    const storageConnectionProvider: Provider = {
      provide: getStorageConnectionToken(connection),
      useFactory: (options: ModuleConfig) => connectionFactory(options),
      inject: [getStorageOptionToken(connection)],
    };

    return {
      module: StorageCoreModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options, connection),
        storageConnectionProvider,
      ],
      exports: [storageConnectionProvider],
    };
  }

  /* createAsyncProviders */
  private static createAsyncProviders(
    options: AsyncModuleConfig,
    connection?: string
  ): Provider[] {
    return [this.createAsyncOptionsProvider(options, connection)];
  }

  /* createAsyncOptionsProvider */
  private static createAsyncOptionsProvider(
    options: AsyncModuleConfig,
    connection?: string
  ): Provider {
    return {
      provide: getStorageOptionToken(connection),
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }
}
