import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import * as AWS from 'aws-sdk';
import { IFile, IUploadImageResponse } from '../../../core';
import { AwsHelper, FriendlyHttpException } from '../../../core/nest';

@Injectable()
export class S3Service {
  private readonly s3: AWS.S3;

  constructor(private _configService: ConfigService) {
    const credentials = _configService.s3Config;

    this.s3 = new AWS.S3({ credentials });
  }

  async uploadImage(file: IFile): Promise<IUploadImageResponse> {
    try {
      const fileName = AwsHelper.fileName();

      const result = await this.s3
        .upload({
          Bucket: this._configService.get('AWS_BUCKET_NAME'),
          Key: fileName,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
        })
        .promise();

      const { Key, Location } = result;

      return { Key, Location };
    } catch (err) {
      throw new FriendlyHttpException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Problem with uploading image',
      );
    }
  }

  async deleteImages(urls: string[]) {
    const deleteOptions = {
      Bucket: this._configService.get('AWS_BUCKET_NAME'),
      Delete: { Objects: urls.map(x => ({ Key: AwsHelper.getFileKey(x) })) },
    };

    await this.s3.deleteObjects(deleteOptions, (err, data) => {
      if (err)
        throw new FriendlyHttpException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Problem with deleting image',
        );
    });
  }
}
