import {Auth} from 'aws-amplify';

export default function Authenticator() {
  function GetUserAttributes() {
    return Auth.currentAuthenticatedUser({
      bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    });
  }

  function LogoutUser() {
    return Auth.signOut();
  }

  return {GetUserAttributes, LogoutUser};
}
