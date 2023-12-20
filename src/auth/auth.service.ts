import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { IAuthInterface } from './AuthInterface';

@Injectable()
export class AuthService implements IAuthInterface {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signIn(email: string, password: string): Promise<string> {
    const user = await this.userService.findByEmail(email);
    if (!user) return 'No use with such entry';
    if (user?.password !== password)
      throw new UnauthorizedException('You are not authorized');
    const payload = { sub: user.id, password };
    const access_token = await this.jwtService.signAsync(payload);
    return access_token;
  }
  signOut(): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
