import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

type JwtPayload = {
  id: string;
  email: string;
  role: string;
  roleId: number;
};

type GenerateTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class JwtAdapterService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateTokens(payload: JwtPayload): Promise<GenerateTokenResponse> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '45s',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '3m',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
