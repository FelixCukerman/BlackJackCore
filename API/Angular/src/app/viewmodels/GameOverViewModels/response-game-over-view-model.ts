export class ResponseGameOverViewModel {
  constructor(username, winsQuantity) {
    this.username = username;
    this.winsQuantity = winsQuantity;
  }

  public username: string;
  public winsQuantity: number;
}
