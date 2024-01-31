import { Module } from '@nestjs/common';
import { SuperuserController } from './superuser.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Superuser, SuperuserSchema } from './entities/superuser.entity';
import { FindAllSuperusersUseCase } from './use-cases/find-all.use-case';
import { FindSuperuserByIdUseCase } from './use-cases/find-by-id.use-case';
import { RemoveSuperuserByIdUseCase } from './use-cases/remove.use-case';
import { UpdateSuperuserUseCase } from './use-cases/update.use-case';
import { GetSuperuserByEmailUseCase } from './use-cases/get-by-email.use-case';
import { ArgonAdapterModule } from '../../infra/argon-adapter/argon-adapter.module';
import { CreateSuperuserUseCase } from './use-cases/create.use-case';
import { JwtAdapterServiceModule } from '../../infra/jwt/jwt-adapter.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Superuser.name, schema: SuperuserSchema },
    ]),
    ArgonAdapterModule,
    JwtAdapterServiceModule,
  ],
  controllers: [SuperuserController],
  providers: [
    GetSuperuserByEmailUseCase,
    FindAllSuperusersUseCase,
    FindSuperuserByIdUseCase,
    UpdateSuperuserUseCase,
    RemoveSuperuserByIdUseCase,
    CreateSuperuserUseCase,
  ],
  exports: [
    CreateSuperuserUseCase,
    GetSuperuserByEmailUseCase,
    UpdateSuperuserUseCase,
    FindSuperuserByIdUseCase,
  ],
})
export class SuperuserModule {}
