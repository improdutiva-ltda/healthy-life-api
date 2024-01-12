import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Post,
  Query,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserByIdUseCase } from './use-cases/find-by-id.use-case';
import { RemoveUserByIdUseCase } from './use-cases/remove.use-case';
import { FindAllUsersUseCase } from './use-cases/find-all.use-case';
import { UpdateUserUseCase } from './use-cases/update.use-case';
import { AccessTokenGuard } from '../../common/guards/access-token.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from './use-cases/create.use-case';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly findAllUsers: FindAllUsersUseCase,
    private readonly findUserById: FindUserByIdUseCase,
    private readonly removeUserById: RemoveUserByIdUseCase,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post(':superUserId')
  create(
    @Param('superUserId') id: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.createUserService.execute(id, createUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll(
    @Query('status') status: string,
    @Query('typeFollowUp') typeFollowUp: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.findAllUsers.execute({ status, typeFollowUp }, page, limit);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findUserById.execute(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUser.execute(id, updateUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeUserById.execute(id);
  }
}
