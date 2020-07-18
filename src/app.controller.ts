import { Controller, Get, Render, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Email } from './models/email';
import { format } from 'date-fns';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    const emails = this.appService.getEmails();
    return { emails };
  }

  @Get('/:id/preview')
  @Render('preview')
  preview(@Param('id') id: string) {
    const email = this.appService.getEmail(id);
    return { email };
  }

  @Get('/:id/html')
  html(@Param('id') id: string) {
    return this.appService.getEmail(id).htmlContent;
  }

  @Post('/v3/smtp/email')
  send(@Body() email: Email) {
    const moment = new Date();
    const id = format(moment, 'T');
    this.appService.saveEmail(email, id);
    return this.respone(id, moment);
  }

  respone(id: string, moment: Date) {
    const date = format(moment, 'yyyyMMddHHmm');
    return { messageId: `<${date}.${id}@smtp-relay.mailin.fr>` };
  }
}
