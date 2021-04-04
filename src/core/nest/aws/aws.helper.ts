import { uuid } from 'uuidv4';

export class AwsHelper {
  static get Uuid(): string {
    return uuid();
  }

  static fileFormat(text: string): string {
    const format = text.split('.').pop();
    return format;
  }

  static fileName(): string {
    return uuid();
  }

  static getFileKey(url: string): string {
    return url.split(process.env.AWS_BUCKET_URL).pop();
  }
}
