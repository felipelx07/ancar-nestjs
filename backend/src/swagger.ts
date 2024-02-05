import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
        .setTitle('Swagger UI')
        .setDescription('Documentação das APIs')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('documentacao', app, document);
}