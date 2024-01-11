import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat';
import { SUPPORTED_LANGUAGES } from './interfaces';
import { RequestTranslateDto } from './dto/request-translate.dto';

@Injectable()
export class OpenaiService {
  private readonly openAIApi: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openAIApi = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }

  public async translate({
    fromLanguage,
    text,
    toLanguage,
  }: RequestTranslateDto): Promise<string> {
    const messages1: Array<ChatCompletionMessageParam> = [
      {
        role: 'system',
        content: `
        Vas a ser la mejor ia de traducción de idiomas, tu mision es recibir un text y traduccirlo a otro idioma.
        el idioma original estara en el formato {{ and }} y ademas puedes recibir {{ auto }} para que detectes el idioma automaticamente.
        el idioma al que vas a traducir estara en el formato [[ and ]] y ademas retornaras el texto traducido en formato JSON de la siguinte forma: { "message": "Hola mundo" }

        Ejemplo:
        Hola mundo {{español}} [[English]] -> Hello world
         `,
      },
    ];

    const fromCode =
      fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage];

    const toCode = SUPPORTED_LANGUAGES[toLanguage];

    const completions = await this.openAIApi.chat.completions.create({
      messages: [
        ...messages1,
        {
          role: 'user',
          content: `${text} {{${fromCode}}} [[${toCode}]]`,
        },
      ],
      max_tokens: 100,
      model: 'gpt-3.5-turbo',
    });

    try {
      return JSON.parse(completions.choices[0].message.content);
    } catch (error) {
      return 'Error en la traducción';
    }
  }
}
