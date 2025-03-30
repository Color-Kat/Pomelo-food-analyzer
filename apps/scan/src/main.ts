import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {kafkaConsumers} from "@app/kafka/kafka-consumers";
import {ConfigService} from "@nestjs/config";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get<number>('SCAN_PORT', 3002);

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    // Connect Kafka
    // app.enableShutdownHooks(); // For correct disconnect from kafka
    app.connectMicroservice<MicroserviceOptions>(kafkaConsumers.scanService);

    await app.listen(port);
    await app.startAllMicroservices();

    console.log("Application is running on: http://localhost:" + port);
}
bootstrap();
