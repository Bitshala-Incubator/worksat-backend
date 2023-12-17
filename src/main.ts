import { AppModule } from '@app/app.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Worksat API')
        .setDescription('Backend services for Worksats.')
        .setVersion('0.0.1')
        .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, swaggerDocument);

    await app.listen(3000);
}
bootstrap();
