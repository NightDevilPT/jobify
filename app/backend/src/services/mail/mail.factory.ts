import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GmailService } from './providers/gmail.service';
import { MailService } from './interface/mail.interface';

@Injectable()
export class MailFactory {
  private mailService: MailService;

  constructor(
    private configService: ConfigService,
    private gmailService: GmailService,
  ) {
    const emailProvider = this.configService.get<string>('EMAIL_PROVIDER');

    switch (emailProvider) {
      case 'gmail':
        this.mailService = this.gmailService;
        break;
      case 'resend':
        // this.mailService = this.resendService;
        break;
      default:
        throw new Error(`Unsupported email provider: ${emailProvider}`);
    }
  }

  getMailService(): MailService {
    return this.mailService;
  }
}
