export class DecodedTokenViewModel
{
  public "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  public "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  public nbf: number;
  public exp: number;
  public iss: string;
  public aud: string;
}
