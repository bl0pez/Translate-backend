import { IsString, IsIn, IsNotEmpty } from 'class-validator';
import { SUPPORTED_LANGUAGES, FROM_SUPPORT_LANGUAGES } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class RequestTranslateDto {
  @ApiProperty({
    description: 'The language to translate from',
    enum: Object.keys(SUPPORTED_LANGUAGES),
    example: 'en',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.keys(FROM_SUPPORT_LANGUAGES))
  public fromLanguage: string;

  @ApiProperty({
    description: 'The language to translate to',

    example: 'es',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.keys(SUPPORTED_LANGUAGES))
  public toLanguage: string;

  @ApiProperty({
    description: 'The text to translate',
    example: 'Hello world',
  })
  @IsNotEmpty()
  @IsString()
  public text: string;
}

// export const SUPPORTED_LANGUAGES = {
//   en: 'English',
//   es: 'Español',
//   de: 'Deutsch',
// };

export const AUTO_DETECT_LANGUAGE = 'auto';

/**
 * Le decimos que el tipo de dato sera el mismo que el de las llaves de SUPPORTED_LANGUAGES
 * con keyof solo le decimos que el tipo de dato sera el mismo que el de las llaves de SUPPORTED_LANGUAGES
 */
export type Language = keyof typeof SUPPORTED_LANGUAGES;
export type AutoLanguage = typeof AUTO_DETECT_LANGUAGE;
export type FromLanguage = Language | AutoLanguage;

export interface InitialStateReducer {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  fromText: string;
  result: string;
  loading: boolean;
}

export enum SectionType {
  From = 'from',
  To = 'to',
}
