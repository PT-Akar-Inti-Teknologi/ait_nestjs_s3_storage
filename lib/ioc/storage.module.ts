import { Module } from '@nestjs/common';
import {
  AsyncModuleConfig,
  ModuleConfig,
} from '../interfaces/module-config.interface';
import { DynamicModule } from '@nestjs/common';
import { StorageCoreModule } from './storage-core.module';
import { StorageService } from '../services/storage.service';

@Module({})
export class StorageModule {
  public static forRoot(
    options: ModuleConfig,
    connection?: string
  ): DynamicModule {
    return {
      module: StorageModule,
      imports: [StorageCoreModule.forRoot(options, connection)],
      providers: [StorageService],
      exports: [StorageCoreModule],
    };
  }

  public static forRootAsync(
    options: AsyncModuleConfig,
    connection?: string
  ): DynamicModule {
    return {
      module: StorageModule,
      imports: [StorageCoreModule.forRootAsync(options, connection)],
      providers: [StorageService],
      exports: [StorageCoreModule, StorageService],
    };
  }
}
