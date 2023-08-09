import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/database/query.repository';
import { UserInterface } from 'src/interfaces/user.interface';
import { User, UserInput } from 'src/schema/graphql';

@Injectable()
export class AuthRepository {
  constructor(private readonly queryRepository: QueryRepository) {}

  async saveUser(userInput: UserInput): Promise<User> {
    const { firstName, lastName, email, password } = userInput;
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `
        CREATE (user:User {firstName: "${firstName}", lastName: "${lastName}", email: "${email}", password: "${password}", isVerified: false})
        RETURN user
    `,
      )
      .run();

    if (query?.length > 0) {
      const {
        user: { identity, properties },
      } = query[0];

      const response = {
        id: identity,
        ...properties,
      };

      // delete response.password;

      return response;
    }
  }

  async verifyEmail(id: string) {
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `
      MATCH (user:User)
      WHERE ID(user) = ${id}
      SET user.isVerified = true
      RETURN user.isVerified AS isVerified
    `,
      )
      .run();

    if (query?.length > 0) {
      return 'Email successfully verified';
    }
  }

  async getUserByEmail(email: string): Promise<UserInterface> {
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `
        MATCH (user {email: "${email}"})
        RETURN user
    `,
      )
      .run();

    if (query?.length > 0) {
      const {
        user: { identity, properties },
      } = query[0];

      return {
        id: identity,
        ...properties,
      };
    }
  }
}