import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { openaiController } from './openai.controller';

@Module({
  controllers: [openaiController],
  providers: [OpenaiService],
})
export class OpenaiModule {}
