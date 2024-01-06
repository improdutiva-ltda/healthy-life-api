import { Injectable } from '@nestjs/common';
import { JwtAdapterService } from 'src/infra/jwt/jwt-adapter.service';
import { UpdateRefreshTokenUseCase } from './update-refresh-token.use-case';
import { SuperuserSignUpResponse } from '../interfaces/superuser.interface';
import { CreateSuperuserDto } from 'src/app/superuser/dto/create-superuser.dto';
import { CreateSuperuserUseCase } from 'src/app/superuser/use-cases/create.use-case';

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly jwtService: JwtAdapterService,
    private readonly updateRefreshToken: UpdateRefreshTokenUseCase,
    private readonly createSuperuser: CreateSuperuserUseCase,
  ) {}

  async execute(
    createSuperuserDto: CreateSuperuserDto,
  ): Promise<SuperuserSignUpResponse> {
    const user = await this.createSuperuser.execute(createSuperuserDto);

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      roleId: user.roleId,
    };

    const tokens = await this.jwtService.generateTokens(payload);

    await this.updateRefreshToken.execute(user.id, tokens.refreshToken);
    return {
      refreshToken: tokens.refreshToken,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        roleId: user.roleId,
      },
    };
  }
}
