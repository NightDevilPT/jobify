import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class SwaggerConfig {
  static setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Job Application')
      .setDescription('API description')
      .setVersion('1.0')
      .addBearerAuth()  // If using JWT Auth
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }
}