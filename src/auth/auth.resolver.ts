import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User, UserInput } from 'src/schema/graphql';
import { AuthService } from './auth.service';
import { UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { createUserValidation } from 'src/validations/user.validation';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  @UsePipes(new ValidationPipe(createUserValidation))
  async createUser(@Args('userInput') userInput: UserInput): Promise<User> {
    return await this.authService.saveUser(userInput);
  }
}
