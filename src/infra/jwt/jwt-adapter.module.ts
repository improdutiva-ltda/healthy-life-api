import { Module } from '@nestjs/common';
import { JwtAdapterService } from './jwt-adapter.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  providers: [JwtAdapterService, JwtService],
  exports: [JwtAdapterService, JwtService],
})
export class JwtAdapterServiceModule {}
