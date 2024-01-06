import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { SignInUseCase } from './use-cases/sign-in.use-case';
import { SignInDto } from './dto/auth.dto';
import { SignUpUseCase } from './use-cases/sign-up.use-case';
import { CreateSuperuserDto } from '../superuser/dto/create-superuser.dto';
import { GetRefreshTokensUseCase } from './use-cases/get-refresh-token.use-case';
import { Request } from 'express';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInService: SignInUseCase,
    private readonly createSuperuser: SignUpUseCase,
    private readonly refreshTokensService: GetRefreshTokensUseCase,
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

  // @Get(':id')
  // logout(@Req() req: Request) {
  //   const userId = req.user['id'];
  //   return this.authService.findOne(+id);
  // }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['id'];
    const refreshToken = req.user['refreshToken'];

    return this.refreshTokensService.execute(userId, refreshToken);
  }
}
