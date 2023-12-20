export interface IAuthInterface {
  signIn(email: string, password: string): Promise<string>;
  signOut(): Promise<string>;
}
