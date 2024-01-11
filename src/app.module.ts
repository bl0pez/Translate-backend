import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenaiModule } from './openai/openai.module';
import { EnvConfiguration } from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfiguration],
    }),
    OpenaiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
