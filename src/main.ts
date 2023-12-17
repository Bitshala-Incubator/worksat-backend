import { AppModule } from '@app/app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableShutdownHooks();

    const configService = app.get(ConfigService);
    const port = configService.get<number>('app.port');

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Worksat API')
        .setDescription('Backend services for Worksats.')
        .setVersion('0.0.1')
        .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, swaggerDocument);

    await app.listen(port);
}
bootstrap();
