import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { getS3ConnectionToken, getS3OptionToken } from '../utils/tokenizer';
import { S3 } from '@aws-sdk/client-s3';
import {
  S3ModuleAsyncOptions,
  S3ModuleOptions,
  S3ModuleOptionsFactory,
} from 'nestjs-s3';
import { S3Service } from '../services/s3.service';

@Global()
@Module({})
export class AitS3Module {
  /* forRoot */
  static forRoot(options: S3ModuleOptions, connection?: string): DynamicModule {
    const s3ConnectionProvider: Provider = {
      provide: getS3ConnectionToken(connection),
      useValue: new S3({
        region: options.config.region,
        credentials: options.config.credentials,
        forcePathStyle: true,
      }),
      inject: [getS3OptionToken(connection)] as never,
    };

    const s3OptionsProvider: Provider = {
      provide: getS3OptionToken(connection),
      useValue: options,
    };

    return {
      module: AitS3Module,
      providers: [s3ConnectionProvider, s3OptionsProvider, S3Service],
      exports: [S3Service],
    };
  }

  /* forRootAsync */
  public static forRootAsync(
    options: S3ModuleAsyncOptions,
    connection?: string
  ): DynamicModule {
    const s3ConnectionProvider: Provider = {
      provide: getS3ConnectionToken(connection),
      useFactory(options: S3ModuleOptions) {
        return new S3(options);
      },
      inject: [getS3OptionToken(connection)],
    };

    return {
      module: AitS3Module,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options, connection),
        s3ConnectionProvider,
        S3Service,
      ],
      exports: [s3ConnectionProvider, S3Service],
    };
  }

  /* createAsyncProviders */
  private static createAsyncProviders(
    options: S3ModuleAsyncOptions,
    connection?: string
  ): Provider[] {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error(
        'Invalid configuration. Must provide useFactory, useClass or useExisting'
      );
    }

    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options, connection)];
    }

    return [
      this.createAsyncOptionsProvider(options, connection),
      { provide: options.useClass, useClass: options.useClass },
    ];
  }

  /* createAsyncOptionsProvider */
  private static createAsyncOptionsProvider(
    options: S3ModuleAsyncOptions,
    connection?: string
  ): Provider {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error(
        'Invalid configuration. Must provide useFactory, useClass or useExisting'
      );
    }

    if (options.useFactory) {
      return {
        provide: getS3OptionToken(connection),
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: getS3OptionToken(connection),
      async useFactory(
        optionsFactory: S3ModuleOptionsFactory
      ): Promise<S3ModuleOptions> {
        return optionsFactory.createS3ModuleOptions();
      },
      inject: [options.useClass || options.useExisting],
    };
  }
}
