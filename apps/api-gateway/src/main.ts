import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
    const app = await NestFactory.create(ApiGatewayModule);

    const port = process.env.port ?? 3000;
    await app.listen(port);

    console.log('Application is running on: http://localhost:' + port);
}

bootstrap();
