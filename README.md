# Nestjs Storage Modules

## AitS3Module

Imports S3 Module, and this module will be available globally.

```typescript
@Module({
  imports: [
    AitS3Module.forRoot({
      config: {
        credentials: {
          accessKeyId: 'your-access-key-id',
          secretAccessKey: 'secret-access-key',
        },
        region: 'bucket-region'
      }
    })
  ]
})
export class AppModule {}
```


and inject s3 service inside your module and you can use s3.
```typescript
// Service
import { S3Service } from 'ait-storage'

@Injectable()
export class UserService {
  constructor(private readonly s3: S3Service) {}

  public async store(payload) {
    const upload = await this.s3.uploadFile({
      Bey: 'filename',
      Bucket: 'bucket-name',
      Body: Buffer,
      UploadId: 'upload-id',
      PartNumber: 123232930
    })

    // { key: string;
    // bucket: string;
    // tag: string;
    // location: string; }

    return upload.location
  }

  public async getProfilePicture() {
    const photo = await this.s3.getSignedFileUrl(
      'filename.png',
      'my-bucket',
      30000 // 30 seconds
    )

    return photo
  }
}
```

or if you want to use s3 client.
```typescript
import {getS3ConnectionToken} from 'ait-storage'

@Injectable()
export class MyService {
  constructor(
    @Inject(getS3ConnectionToken()) private readonly s3Client: S3 // import S3 from @aws-sdk/client-s3
  ) {}
}
```
