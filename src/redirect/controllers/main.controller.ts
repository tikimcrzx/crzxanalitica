import { Controller, Post, Res, Body, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { IntentParameterDTO } from '../../shared/input-dto';
import { Intents } from '../enums/intents.enum';
import { URLs } from '../enums/url.enum';

@Controller('main')
export class MainController {
  @Post()
  async main(
    @Body() intentParametorDto: IntentParameterDTO,
    @Res() res: Response,
  ) {
    let url: string = '';
    const displayName = intentParametorDto.queryResult.intent.displayName;

    if (displayName === Intents.RESTAURANT_MENU) {
      url = URLs.MENU;
    } else if (displayName === Intents.RESTAURANT_ORDER) {
      url = URLs.ORDER;
    }

    res.redirect(HttpStatus.TEMPORARY_REDIRECT, url);
  }
}
