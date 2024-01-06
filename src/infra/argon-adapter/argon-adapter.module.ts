import { Module } from '@nestjs/common';
import { ArgonAdapterService } from './argon-adapter.service';

@Module({
  providers: [ArgonAdapterService],
  exports: [ArgonAdapterService],
})
export class ArgonAdapterModule {}
