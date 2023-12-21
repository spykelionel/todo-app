import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { IAuthInterface } from './AuthInterface';
// import { Request } from '@nestjs/common';

@Injectable()
export class AuthService implements IAuthInterface {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signIn(email: string, password: string): Promise<string | any> {
    const user = await this.userService.findByEmail(email);
    if (!user) return 'Credentials do not match.';

    const ismatchedUser = await bcrypt.compare(password, user?.password!);
    if (!ismatchedUser)
      throw new UnauthorizedException('You are not authorized');
    const payload = { ...user };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      ...payload,
      password: undefined,
      access_token,
    };
  }
  async signOut(): Promise<string> {
    return 'You are now signed out of the application.';
  }
}
