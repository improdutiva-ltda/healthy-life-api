import { Module } from '@nestjs/common';
import { SuperuserModule } from './app/superuser/superuser.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './app/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost/healthy-life-db'),
    SuperuserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
