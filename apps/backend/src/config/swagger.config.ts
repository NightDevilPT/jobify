import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Jobify API')
  .setDescription('API documentation for the Jobify job portal backend.')
  .setVersion('1.0')
  .addCookieAuth('accessToken', {
    type: 'apiKey',
    in: 'cookie',
    name: 'accessToken',
  })
  .addCookieAuth('refreshToken', {
    type: 'apiKey',
    in: 'cookie',
    name: 'refreshToken',
  })
  .build();

export const swaggerCustomOptions: SwaggerCustomOptions = {
  customSiteTitle: 'Jobify API Docs',
  customfavIcon:
    'https://firebasestorage.googleapis.com/v0/b/file-system-e3b65.appspot.com/o/file-storage-avtar%2Flogo.png?alt=media&token=021e454f-f2fb-4885-9762-90844a76d349',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
  ],
  customCssUrl: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
  ],
};
