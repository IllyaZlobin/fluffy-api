import { AwsHelper } from '../aws';
import { ImageExtensions } from '../constants';
import { ValidationException } from '../exceptions';
import { IFile } from '../upload';

export const imageFileFilter = (
  req,
  file: IFile,
  callback,
  property: string[] = [],
  isRequired = false,
) => {
  if (!file) {
    if (isRequired) {
      return callback(
        new ValidationException({ message: 'Image is required', property }),
        false,
      );
    }
    return callback(null, true);
  }

  const fileExt = AwsHelper.fileFormat(file.originalname);

  if (fileExt && ImageExtensions.includes(fileExt.toLocaleLowerCase())) {
    return callback(null, true);
  }

  return callback(
    new ValidationException({ message: 'Only images are allowed', property }),
    false,
  );
};
