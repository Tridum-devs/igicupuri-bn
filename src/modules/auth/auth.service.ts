import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PasswordHelper } from 'src/helpers/password.helper';
import { MailerHelper } from 'src/helpers/mailer.helper';
import {
  LoginInput,
  LoginResponse,
  UserInput,
  UserResponse,
} from 'src/schema/graphql';
import { AuthRepository } from './auth.repository';
import { AuthHelper } from 'src/helpers/auth.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordHelper: PasswordHelper,
    private readonly authHelper: AuthHelper,
    private readonly mailerHelper: MailerHelper,
    private readonly authRepository: AuthRepository,
  ) {}

  async saveUser(userInput: UserInput): Promise<UserResponse> {
    const { firstName, lastName, email, password } = userInput;
    const user = await this.authRepository.getUserByEmail(email);
    const hash = await this.passwordHelper.hashPassword(password);

    if (user) {
      throw new HttpException(
        'Email is already registered',
        HttpStatus.CONFLICT,
      );
    }

    const userInfo: UserInput = {
      ...userInput,
      password: hash,
    };

    const token = await this.authHelper.generateJwtToken({
      email: email,
    });

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
          <a href="http://localhost:4000/token=${token}"
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

    try {
      await this.mailerHelper.sendEmail(email, subject, text);
    } catch (error) {
      throw new HttpException(
        'Email delivery has failed, please check again your email address or try again later',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.authRepository.saveUser(userInfo);
  }

  async verifyEmail(token: string): Promise<string> {
    const user = await this.authHelper.verifyJwtToken(token);
    return await this.authRepository.verifyEmail(user?.id);
  }

  async loginUser(loginInput: LoginInput): Promise<LoginResponse> {
    const { email, password } = loginInput;
    const user = await this.authRepository.getUserByEmail(email);
    const correctPassword =
      user &&
      (await this.passwordHelper.comparePassword(password, user?.password));

    if (!user || !correctPassword) {
      throw new HttpException(
        'Incorrect email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (!user?.isVerified) {
      throw new HttpException(
        'Please check your inbox and verify your email to login',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = {
      id: user?.id,
    };
    const token = await this.authHelper.generateJwtToken(payload);

    return {
      message: 'Successfully logged in',
      token,
    };
  }
}
