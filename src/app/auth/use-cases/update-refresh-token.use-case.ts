import { Injectable } from '@nestjs/common';
import { UpdateSuperuserUseCase } from '../../superuser/use-cases/update.use-case';
import { ArgonAdapterService } from '../../../infra/argon-adapter/argon-adapter.service';

@Injectable()
export class UpdateRefreshTokenUseCase {
  constructor(
    private readonly updateSuperuserUseCase: UpdateSuperuserUseCase,
    private readonly hashData: ArgonAdapterService,
  ) {}

  async execute(userId: string, refreshToken: string) {
    let hashedRefreshToken = null;
    if (refreshToken) {
      hashedRefreshToken = await this.hashData.hash(refreshToken);
    }

    await this.updateSuperuserUseCase.execute(userId, {
      refreshToken: hashedRefreshToken,
    });
  }
}
