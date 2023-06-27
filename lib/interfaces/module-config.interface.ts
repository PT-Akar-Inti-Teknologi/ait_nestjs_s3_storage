import { Type } from "@nestjs/common"

export interface ModuleConfig {
  type: 'azure' | 's3'
  accessKeyId?: string
  secretAccessKey?: string
  region?: string
  bucket?: string
  signedExpiration?: number
  pathDestination?: string
}

export interface AsyncModuleConfig {
  imports?: any[]
  inject?: any[]
  useFactory?: (...args: any[]) => Promise<ModuleConfig> | ModuleConfig
}