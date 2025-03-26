import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiGatewayModule } from '../../api-gateway/src/api-gateway.module';

async function bootstrap() {
    const app = await NestFactory.create(ApiGatewayModule);

    const port = process.env.port ?? 3001;
    await app.listen(port);

    console.log('Application is running on: http://localhost:' + port);
}
bootstrap();
