import { TemplateEnum, TemplatePayloadMap } from "../helpers/template-generator";

export const verifyEmailTemplate = (payload: TemplatePayloadMap[TemplateEnum.VERIFY_EMAIL]): string => {
  const { username, url } = payload;

  return `
    <html>
      <head>
        <style>
          .button {
            background-color: #4caf50;
            color: white;
            padding: 12px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            border-radius: 5px;
            font-size: 16px;
          }
        </style>
      </head>
      <body>
        <h2>Hello ${username},</h2>
        <p>Thank you for signing up! Please verify your email by clicking the button below:</p>
        <a href="${url}" class="button">Verify Email</a>
        <p>If you didn’t request this, you can safely ignore this email.</p>
      </body>
    </html>
  `;
};
