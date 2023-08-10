import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PasswordHelper } from 'src/helpers/password.helper';
import { MailerHelper } from 'src/helpers/mailer.helper';
import { AuthRepository } from './auth.repository';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtDynamicModule } from './modules/jwt.module';
import { AuthHelper } from 'src/helpers/auth.helper';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtDynamicModule.forRoot(),
    ConfigModule,
  ],
  providers: [
    AuthResolver,
    AuthService,
    PasswordHelper,
    AuthHelper,
    MailerHelper,
    AuthRepository,
  ],
  exports: [AuthService, AuthRepository],
})
export class AuthModule {}
