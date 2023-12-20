import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'somejwtsecret',
      global: true,
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class AuthModule {}
