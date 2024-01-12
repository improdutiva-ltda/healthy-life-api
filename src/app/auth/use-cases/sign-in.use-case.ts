import { SignInDto } from '../dto/auth.dto';
import { GetSuperuserByEmailUseCase } from '../../superuser/use-cases/get-by-email.use-case';
import { UpdateRefreshTokenUseCase } from './update-refresh-token.use-case';
import { JwtAdapterService } from '../../../infra/jwt/jwt-adapter.service';
import { Injectable } from '@nestjs/common';
import { ArgonAdapterService } from '../../../infra/argon-adapter/argon-adapter.service';
import { SuperuserSignInResponse } from '../interfaces/superuser.interface';
import { UnauthorizedError } from '../../errors/unauthorized-error/unauthorized-error';

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly updateRefreshToken: UpdateRefreshTokenUseCase,
    private readonly getSuperuserByEmail: GetSuperuserByEmailUseCase,
    private readonly argon: ArgonAdapterService,
    private readonly jwtService: JwtAdapterService,
  ) {}

  async execute(signInDto: SignInDto): Promise<SuperuserSignInResponse> {
    const { email, password } = signInDto;
    const { user } = await this.getSuperuserByEmail.execute(email);

    const passwordMatch = await this.argon.compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedError('Email ou senha incorreta');

    const payload = {
      id: String(user.id),
      email: user.email,
      role: user.role,
      roleId: user.roleId,
    };

    const tokens = await this.jwtService.generateTokens(payload);
    await this.updateRefreshToken.execute(String(user.id), tokens.refreshToken);
    return {
      accessToken: tokens.accessToken,
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
