import { S3 } from "@aws-sdk/client-s3";
import { ModuleConfig } from "../interfaces/module-config.interface";
declare function createS3ConnectionFactory(options: ModuleConfig): S3;
export declare function connectionFactory(options: ModuleConfig): typeof createS3ConnectionFactory | ((options: ModuleConfig) => never);
export {};
