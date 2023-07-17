import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthHelper } from 'src/helpers/auth.helper';
import { MailerHelper } from 'src/helpers/mailer.helper';
import { User, UserInput } from 'src/schema/graphql';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly authHelper: AuthHelper,
    private readonly mailerHelper: MailerHelper,
    private readonly authRepository: AuthRepository,
  ) {}

  async saveUser(userInput: UserInput): Promise<User> {
    try {
      const { firstName, lastName, email, password } = userInput;
      const user = await this.authRepository.getUserByEmail(email);
      const hash = await this.authHelper.hashPassword(password);

      if (user) {
        throw new ConflictException(
          'This email is already registered in our system',
        );
      }

      const frontendUrl = this.configService.get('FRONTEND_URL');
      const subject = 'Igicupuri account creation was successful';
      const text = `
           <div
        style="
          background-color: rgb(241, 241, 241);
          border-radius: 10px;
          width: fit-content;
          margin: auto;
          padding: 10px 20px 20px 20px;
          max-width: 320px;
        "
      >
        <h1 style="color: rgb(141, 63, 156)">Email Verification</h1>
        <p>Dear ${firstName} ${lastName},</p>
        <p>
          Thank you for registering with our service. To complete your
          registration, please click the link below to verify your email address:
        </p>
        <p>
          <a href="${frontendUrl}"
            ><button
              style="
                padding: 10px;
                font-weight: 700;
                background-color: rgb(255, 217, 0);
                border: none;
                color: rgb(0, 0, 0);
                border-radius: 5px;
                cursor: pointer;
              "
            >
              Verify Email
            </button></a
          >
        </p>
        <br />
        <p>If you didn't register on our platform, please ignore this email.</p>
        <p>Best regards.</p>
        <h4>Igicupuri DevOps</h4>
      </div>
      `;

      await this.mailerHelper.sendEmail(email, subject, text);

      const userInfo: UserInput = {
        ...userInput,
        password: hash,
      };

      return await this.authRepository.saveUser(userInfo);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
