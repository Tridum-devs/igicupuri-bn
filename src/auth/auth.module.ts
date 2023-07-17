import { Module, forwardRef } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthHelper } from 'src/helpers/auth.helper';
import { MailerHelper } from 'src/helpers/mailer.helper';
import { AuthRepository } from './auth.repository';

@Module({
  providers: [
    AuthResolver,
    AuthService,
    AuthHelper,
    MailerHelper,
    AuthRepository,
  ],
  exports: [AuthService, AuthRepository],
})
export class AuthModule {}
