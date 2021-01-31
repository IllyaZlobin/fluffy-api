export class RefreshSessionRequest {
  idToken: string;
  refreshToken: string;

  constructor(idToken: string, refreshToken: string) {
    this.idToken = idToken;
    this.refreshToken = refreshToken;
  }
}
