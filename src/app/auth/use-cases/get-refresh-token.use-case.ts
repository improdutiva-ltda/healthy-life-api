import { ForbiddenException, Injectable } from '@nestjs/common';
import { FindSuperuserByIdUseCase } from 'src/app/superuser/use-cases/find-by-id.use-case';
import { ArgonAdapterService } from 'src/infra/argon-adapter/argon-adapter.service';
import { UpdateRefreshTokenUseCase } from './update-refresh-token.use-case';
import { JwtAdapterService } from 'src/infra/jwt/jwt-adapter.service';

@Injectable()
export class GetRefreshTokensUseCase {
  constructor(
    private readonly updateRefreshToken: UpdateRefreshTokenUseCase,
    private readonly loadSuperuserById: FindSuperuserByIdUseCase,
    private readonly argonService: ArgonAdapterService,
    private readonly jwtService: JwtAdapterService,
  ) {}

  async execute(userId: string, refreshToken: string) {
    const { user } = await this.loadSuperuserById.execute(userId);

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Acesso negado');

    const refreshTokenMatches = await this.argonService.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Acesso negado');

    const payload = {
      id: String(user.id),
      email: user.email,
      role: user.role,
      roleId: user.roleId,
    };
    const tokens = await this.jwtService.generateTokens(payload);

    await this.updateRefreshToken.execute(String(user.id), tokens.refreshToken);
    return tokens;
  }
}
