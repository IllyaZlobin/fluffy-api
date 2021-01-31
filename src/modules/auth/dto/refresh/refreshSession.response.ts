export class RefreshSessionResponse {
  accessToken: string;
  refreshToken: string;
  idToken: string;

  constructor(accessToken?: string, refreshToken?: string, idToken?: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.idToken = idToken;
  }
}
