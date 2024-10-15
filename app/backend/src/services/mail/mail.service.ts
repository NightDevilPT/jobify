import { Injectable } from '@nestjs/common';
import { MailFactory } from './mail.factory';

@Injectable()
export class MailService {
  constructor(private mailFactory: MailFactory) {}

  async sendRegistrationEmail(to: string, username: string, token: string) {
    const mailService = this.mailFactory.getMailService();
    await mailService.sendMail(to, 'Complete Your Registration', 'register.template', { username, token });
  }

  async sendVerificationEmail(to: string, username: string, verificationUrl: string) {
    const mailService = this.mailFactory.getMailService();
    await mailService.sendMail(to, 'Verify Your Email', 'verify.template', { username, verificationUrl });
  }

  async sendWelcomeEmail(to: string, username: string) {
    const mailService = this.mailFactory.getMailService();
    await mailService.sendMail(to, 'Welcome to Our Service', 'welcome.template', { username });
  }

  async sendAccountDeletionEmail(to: string, username: string, token: string) {
    const mailService = this.mailFactory.getMailService();
    await mailService.sendMail(to, 'Account Deletion Request', 'delete.template', { username, token });
  }
}
