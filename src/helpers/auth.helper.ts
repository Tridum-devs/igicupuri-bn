import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthHelper {
  constructor(private readonly jwtService: JwtService) {}
  async generateJwtToken(payload: any): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }

  async verifyJwtToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token);
  }
}
