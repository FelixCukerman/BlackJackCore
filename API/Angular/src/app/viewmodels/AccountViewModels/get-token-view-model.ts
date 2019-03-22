export class GetTokenViewModel {
  constructor(accessToken, username) {
    this.accessToken = accessToken;
    this.username = username;
  }

  public accessToken: string;
  public username: string;
}
