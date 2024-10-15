import { join } from 'path';
import * as fs from 'fs-extra';
import * as handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../interface/mail.interface';

@Injectable()
export class GmailService implements MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService.get<string>('GMAIL_PASSWORD'),
      },
    });
  }

  private async loadTemplate(templateName: string, variables: Record<string, any>): Promise<string> {
    const templatePath = join(__dirname, 'templates', `${templateName}.hbs`);
    const templateContent = await fs.readFile(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateContent);
    return compiledTemplate(variables);
  }

  async sendMail(to: string, subject: string, templateName: string, variables: Record<string, any>): Promise<void> {
    const htmlContent = await this.loadTemplate(templateName, variables);

    const mailOptions = {
      from: this.configService.get<string>('GMAIL_USER'),
      to,
      subject,
      html: htmlContent,
    };

    await this.transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to} via Gmail`);
  }
}
