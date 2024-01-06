import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UpdateSuperuserDto } from './dto/update-superuser.dto';
import { FindSuperuserByIdUseCase } from './use-cases/find-by-id.use-case';
import { RemoveSuperuserByIdUseCase } from './use-cases/remove.use-case';
import { FindAllSuperusersUseCase } from './use-cases/find-all.use-case';
import { UpdateSuperuserUseCase } from './use-cases/update.use-case';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';

@Controller('superuser')
export class SuperuserController {
  constructor(
    private readonly updateSuperuser: UpdateSuperuserUseCase,
    private readonly findAllSuperusers: FindAllSuperusersUseCase,
    private readonly findSuperuserById: FindSuperuserByIdUseCase,
    private readonly removeSuperuserById: RemoveSuperuserByIdUseCase,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll() {
    return this.findAllSuperusers.execute();
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findSuperuserById.execute(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSuperuserDto: UpdateSuperuserDto,
  ) {
    return this.updateSuperuser.execute(id, updateSuperuserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeSuperuserById.execute(id);
  }
}
