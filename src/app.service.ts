import { Injectable } from '@nestjs/common';
import { PrismaServices } from './prisma.service';
import * as AWS from 'aws-sdk';

@Injectable()
export class AppService {
  private readonly AWS_S3_BUCKET = process.env.AWS_S3_BUCKET || 'bookly-app';

  private readonly s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'eu-north-1',
  });

  constructor(private prisma: PrismaServices) {}

  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const params = {
        Bucket: this.AWS_S3_BUCKET,
        Key: file.originalname, 
        Body: file.buffer,
        ContentType: file.mimetype,
        ContentDisposition: 'inline',
      };

      const uploadResult = await this.s3.upload(params).promise();

  
      return uploadResult.Location; 
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('File upload failed');
    }
  }

  /**
   * Generic upload helper in case you pass raw file buffer manually
   */
  async s3_upload(
    file: Buffer,
    bucket: string,
    name: string,
    mimetype: string,
  ): Promise<string> {
    try {
      const params = {
        Bucket: bucket,
        Key: name,
        Body: file,
        ContentType: mimetype,
        ContentDisposition: 'inline',
      };

      const uploadResult = await this.s3.upload(params).promise();
      return uploadResult.Location;
    } catch (error) {
      console.error('S3 Upload Error:', error);
      throw new Error('S3 upload failed');
    }
  }
}
