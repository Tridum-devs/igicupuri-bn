import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  welcomeMsg(): string {
    return 'Hi! Welcome To Igicupuri!';
  }
}
