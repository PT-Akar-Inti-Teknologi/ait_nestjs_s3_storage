# Nestjs Storage Modules

## AitS3Module

Imports S3 Module, and this module will be available globally. Don't forget to use forRootAsync if you want to initiate module after the configuration was loaded.

```typescript
@Module({
  imports: [
    StorageModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(env: ConfigService) {
        return {
          accessKeyId: env.get<string>('S3_ACCESS_KEY_ID'),
          secretAccessKey: env.get<string>('S3_SECRET_ACCESS_KEY'),
          region: env.get<string>('S3_REGION'),
          signedExpiration: 10000,
          bucket: env.get<string>('S3_BUCKET_NAME'),
          type: 's3',
        };
      },
    }),
  ],
})
export class AppModule {}
```

and inject s3 service inside your module and you can use s3.

```typescript
// Service
import { StorageService } from 'ait-storage';

@Injectable()
export class UserService {
  constructor(private readonly s3: StorageService) {}

  public async store(payload) {
    const upload = await this.s3.uploadFile({
      fileBuffer: payload.buffer,
      filename: payload.filename,
      referenceId: payload.id,
    });

    return upload.location;
  }

  public async getProfilePicture() {
    const photo = await this.s3.getSignedFileUrl('filename.png');

    return photo;
  }
}
```

or if you want to directly use s3 client.

```typescript
import { getStorageConnectionToken } from 'ait-storage';

@Injectable()
export class MyService {
  constructor(
    @Inject(getStorageConnectionToken()) private readonly s3Client: S3 // import S3 from @aws-sdk/client-s3
  ) {}
}
```
