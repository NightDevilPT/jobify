import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailFactory } from './mail.factory';
import { GmailService } from './providers/gmail.service';
import { MailService } from './mail.service';

@Module({
  imports: [ConfigModule],
  providers: [MailFactory, GmailService, MailService],
  exports: [MailFactory,MailService],
})
export class MailModule {}
