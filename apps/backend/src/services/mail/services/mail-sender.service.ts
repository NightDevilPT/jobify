// src/mail/mail-sender.service.ts
import { Injectable } from '@nestjs/common';
import { MailFactoryService } from './mail-factory.service';
import { MailPayload, MailProvider } from '../interface';

@Injectable()
export class MailSenderService {
  constructor(private readonly mailFactoryService: MailFactoryService) {}

  async send(
    provider: MailProvider,
    payload: MailPayload,
  ): Promise<{ success: boolean; provider: MailProvider }> {
    const mailer = this.mailFactoryService.getProvider(provider);
    await mailer.sendMail(payload);

    return {
      success: true,
      provider,
    };
  }
}
