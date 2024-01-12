import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { FindAllUsersUseCase } from './use-cases/find-all.use-case';
import { FindUserByIdUseCase } from './use-cases/find-by-id.use-case';
import { RemoveUserByIdUseCase } from './use-cases/remove.use-case';
import { UpdateUserUseCase } from './use-cases/update.use-case';
import { GetUserByEmailUseCase } from './use-cases/get-by-email.use-case';
import { CreateUserUseCase } from './use-cases/create.use-case';
import { UserController } from './user.controller';
import { SuperuserModule } from '../superuser/superuser.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    SuperuserModule,
  ],
  controllers: [UserController],
  providers: [
    GetUserByEmailUseCase,
    FindAllUsersUseCase,
    FindUserByIdUseCase,
    UpdateUserUseCase,
    RemoveUserByIdUseCase,
    CreateUserUseCase,
  ],
  exports: [],
})
export class UserModule {}
