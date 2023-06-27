import { DynamicModule } from '@nestjs/common';
import { AsyncModuleConfig, ModuleConfig } from '../interfaces/module-config.interface';
export declare class StorageCoreModule {
    static forRoot(options: ModuleConfig, connection?: string): DynamicModule;
    static forRootAsync(options: AsyncModuleConfig, connection?: string): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
