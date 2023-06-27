import { AsyncModuleConfig, ModuleConfig } from '../interfaces/module-config.interface';
import { DynamicModule } from '@nestjs/common';
export declare class StorageModule {
    static forRoot(options: ModuleConfig, connection?: string): DynamicModule;
    static forRootAsync(options: AsyncModuleConfig, connection?: string): DynamicModule;
}
