import { S3 } from "@aws-sdk/client-s3";
import { ModuleConfig } from "../interfaces/module-config.interface";


function createS3ConnectionFactory(options: ModuleConfig) {
  try {
    const client = new S3({
      credentials: {
        accessKeyId: options.accessKeyId,
        secretAccessKey: options.secretAccessKey,
      },
      region: options.region
    })

    return client
  } catch (error) {
    throw new Error(error)
  }
}

export function connectionFactory(options: ModuleConfig) {
  const type = options.type    
  
  const connections = {
    s3: createS3ConnectionFactory,
    azure: (options: ModuleConfig) => {throw new Error(`No connection provided for ${options.type}`)}
  }

  return connections[type]
}
