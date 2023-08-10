import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  LoginInput,
  LoginResponse,
  User,
  UserInput,
  UserResponse,
} from 'src/schema/graphql';
import { AuthService } from './auth.service';
import { UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import {
  createUserValidation,
  loginUserValidation,
} from 'src/validations/user.validation';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  @UsePipes(new ValidationPipe(createUserValidation))
  async createUser(
    @Args('userInput') userInput: UserInput,
  ): Promise<UserResponse> {
    return await this.authService.saveUser(userInput);
  }

  @Query()
  async verifyEmail(@Args('token') token: string): Promise<string> {
    return await this.authService.verifyEmail(token);
  }

  @Mutation()
  @UsePipes(new ValidationPipe(loginUserValidation))
  async loginUser(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<LoginResponse> {
    return await this.authService.loginUser(loginInput);
  }
}
