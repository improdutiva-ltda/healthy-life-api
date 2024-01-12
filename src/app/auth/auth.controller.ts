import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { SignInUseCase } from './use-cases/sign-in.use-case';
import { SignInDto } from './dto/auth.dto';
import { SignUpUseCase } from './use-cases/sign-up.use-case';
import { CreateSuperuserDto } from '../superuser/dto/create-superuser.dto';
import { GetRefreshTokensUseCase } from './use-cases/get-refresh-token.use-case';
import { Request } from 'express';
import { RefreshTokenGuard } from '../../common/guards/refresh-token.guard';
import { AccessTokenGuard } from '../../common/guards/access-token.guard';
import { UpdateRefreshTokenUseCase } from './use-cases/update-refresh-token.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInService: SignInUseCase,
    private readonly createSuperuser: SignUpUseCase,
    private readonly refreshTokensService: GetRefreshTokensUseCase,
    private readonly removeRefreshToken: UpdateRefreshTokenUseCase,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post('register')
  register(@Body() createSuperuserDto: CreateSuperuserDto) {
    return this.createSuperuser.execute(createSuperuserDto);
  }

  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.signInService.execute(signInDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    const userId = req.user['id'];
    const refreshToken = null;
    return this.removeRefreshToken.execute(userId, refreshToken);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['id'];
    const refreshToken = req.user['refreshToken'];

    return this.refreshTokensService.execute(userId, refreshToken);
  }
}
