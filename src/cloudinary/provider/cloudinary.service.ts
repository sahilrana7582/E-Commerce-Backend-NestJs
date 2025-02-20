import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: 'dev67qiod',
      api_key: '729592619794181',
      api_secret: 'PirLx_D3bsBZbP4ASF2xUD3Yrwc',
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    if (!file || !file.buffer) {
      throw new Error('No file provided or file buffer is empty');
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        (error, result) => {
          if (error) {
            return reject(
              new Error(`Cloudinary upload failed: ${error.message}`)
            );
          }
          resolve(result as UploadApiResponse);
        }
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}