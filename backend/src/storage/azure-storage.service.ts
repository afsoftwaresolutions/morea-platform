import { Injectable } from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';
import { randomUUID } from 'crypto';
import type { Express } from 'express';

@Injectable()
export class AzureStorageService {
  private readonly blobServiceClient: BlobServiceClient;

  constructor() {
    const connectionString =
      process.env.AZURE_STORAGE_CONNECTION_STRING;

    if (!connectionString) {
      throw new Error(
        'AZURE_STORAGE_CONNECTION_STRING is not configured',
      );
    }

    this.blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
  }

  async uploadProductImage(file: Express.Multer.File) {
    const containerName =
      process.env.AZURE_STORAGE_CONTAINER_NAME ?? 'morea-products';

    const containerClient =
      this.blobServiceClient.getContainerClient(containerName);

    await containerClient.createIfNotExists({
      access: 'blob',
    });

    const extension = file.originalname.split('.').pop();

    const blobName =
      `products/${randomUUID()}.${extension}`;

    const blockBlobClient =
      containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: {
        blobContentType: file.mimetype,
      },
    });

    return {
      url: blockBlobClient.url,
      blobName,
    };
  }
}