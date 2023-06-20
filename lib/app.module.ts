import { Module } from '@nestjs/common';
import { AitS3Module } from './ioc/s3.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AitS3Module.forRootAsync({
      imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' })],
      inject: [ConfigService],
      useFactory: (env: ConfigService) => ({
        config: {
          credentials: {
            accessKeyId: env.get<string>('S3_ACCESS_KEY_ID'),
            secretAccessKey: env.get<string>('S3_SECRET_ACCESS_KEY'),
          },
          region: env.get<string>('S3_REGION'),
        },
      }),
    }),
  ],
})
export class AppModule {}
