import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UpdateRefreshTokenUseCase } from './use-cases/update-refresh-token.use-case';
import { SignInUseCase } from './use-cases/sign-in.use-case';
import { SuperuserModule } from '../superuser/superuser.module';
import { JwtAdapterServiceModule } from '../../infra/jwt/jwt-adapter.module';
import { ArgonAdapterModule } from '../../infra/argon-adapter/argon-adapter.module';
import { SignUpUseCase } from './use-cases/sign-up.use-case';
import { GetRefreshTokensUseCase } from './use-cases/get-refresh-token.use-case';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [SuperuserModule, JwtAdapterServiceModule, ArgonAdapterModule],
  controllers: [AuthController],
  providers: [
    UpdateRefreshTokenUseCase,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    SignInUseCase,
    SignUpUseCase,
    GetRefreshTokensUseCase,
  ],
})
export class AuthModule {}
