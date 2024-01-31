import { Module } from '@nestjs/common';
import { SuperuserModule } from './app/superuser/superuser.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './app/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './app/user/user.module';
import { AnthropometricEvaluationModule } from './app/anthropometric-evaluation/anthropometric-evaluation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    SuperuserModule,
    AuthModule,
    UserModule,
    AnthropometricEvaluationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
