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

  // Load and compile the Handlebars template dynamically based on environment
  private async loadTemplate(templateName: string, variables: Record<string, any>): Promise<string> {
    // Determine whether we are in development or production mode
    const isDevelopment = this.configService.get<string>("NODE_ENV") !== 'production';

    // Dynamically resolve the template path
    const templatePath = isDevelopment
      ? join(process.cwd(), 'src', 'services', 'mail', 'templates', `${templateName}.hbs`)
      : join(process.cwd(), 'dist', 'services', 'mail', 'templates', `${templateName}.hbs`);

    try {
      const templateContent = await fs.readFile(templatePath, 'utf-8');
      const compiledTemplate = handlebars.compile(templateContent);
      return compiledTemplate(variables);
    } catch (error) {
      throw new Error(`Error loading email template: ${templateName} - ${error.message}`);
    }
  }

  // Send an email using the Gmail service with the compiled Handlebars template
  async sendMail(to: string, subject: string, templateName: string, variables: Record<string, any>): Promise<void> {
    const htmlContent = await this.loadTemplate(templateName, variables);

    const mailOptions = {
      from: this.configService.get<string>('GMAIL_USER'),
      to,
      subject,
      html: htmlContent,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to} via Gmail`);
    } catch (error) {
      console.error(`Error sending email to ${to}:`, error);
      throw new Error(`Failed to send email to ${to}`);
    }
  }
}
