export interface MailService {
	sendMail(
	  to: string,
	  subject: string,
	  templateName: string,
	  variables: Record<string, any>
	): Promise<void>;
  }
  