import {Storage} from 'aws-amplify';
import Authenticator from '../../backend/auth/Authenticator';

export default async function UploadPhoto(photo, temporary) {
  try {
    const {username} = await Authenticator().GetUserSub();

    const timestamp = new Date().getTime();
    const response = await fetch(photo);
    const blob = await response.blob();

    const key = temporary
      ? `TEMP-${username}-${timestamp}.jpeg`
      : `${username}-${timestamp}.jpeg`;

    const imageInfo = await Storage.put(key, blob, {
      acl: 'public-read',
      contentType: 'image/jpeg',
    });

    return {key: imageInfo.key};
  } catch (e) {
    throw e;
  }
}
