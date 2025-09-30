import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// Make sure the path to TaskFileGuard is correct
import { JwtAuthGuard } from './auth/JWT';
import { TaskFileGuard } from './Guards/Guards'; // Adjust this import path if needed

dotenv.config();

async function bootstrap() {
    const logger = new Logger();

    const app = await NestFactory.create(AppModule);

    // Enable validation with transformation and whitelist
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
    
    // Enable CORS
    app.enableCors({
        origin: process.env.Frontend_URL || 'http://localhost:4210',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    const configService = app.get(ConfigService);

    // Swagger setup
    const config = new DocumentBuilder()
        .setTitle('Task')
        .setDescription('Task-Backend')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    

    const port = configService.get<number>('PORT') || 3000;
    await app.listen(port);
}

bootstrap();

