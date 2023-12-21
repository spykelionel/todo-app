export interface IAuthInterface {
  signIn(email: string, password: string): Promise<string | any>;
  signOut(): Promise<string>;
}
