import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { Email } from './models/email';

@Injectable()
export class AppService {
  private emails: Email[] = [];

  saveEmail(email: Email, id: string) {
    const moment = format(new Date(), 'dd/MM/yy HH:mm:ss');
    this.emails.push({ ...email, moment, id });
  }

  getEmails() {
    return this.emails;
  }

  getEmail(id: string) {
    return this.emails.find(email => email.id === id);
  }
}
