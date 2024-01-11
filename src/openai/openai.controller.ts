import { Body, Controller, Post } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestTranslateDto } from './dto/request-translate.dto';

@ApiTags('translate')
@Controller('api/v1/openai')
export class openaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @ApiResponse({
    status: 200,
    description: 'The translation has been successfully translated.',
    type: String,
  })
  @Post('translate')
  public async translate(@Body() body: RequestTranslateDto) {
    return this.openaiService.translate(body);
  }
}
