import { AppService } from './app.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  welcomeMessage(): string {
    return this.appService.welcomeMsg();
  }
}
