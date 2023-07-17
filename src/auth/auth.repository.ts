import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/database/query.repository';
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
        CREATE (user:User {firstName: "${firstName}", lastName: "${lastName}", email: "${email}", password: "${password}"})
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

  async getUserByEmail(email: string): Promise<User> {
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
