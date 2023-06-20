import { DynamicModule } from '@nestjs/common';
import { S3ModuleAsyncOptions, S3ModuleOptions } from 'nestjs-s3';
export declare class AitS3Module {
    static forRoot(options: S3ModuleOptions, connection?: string): DynamicModule;
    static forRootAsync(options: S3ModuleAsyncOptions, connection?: string): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
