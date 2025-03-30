import { NestFactory } from '@nestjs/core';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {kafkaConsumers} from "@app/kafka/kafka-consumers";
import {AppModule} from "./app.module";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get<number>('PRODUCT_ANALYZER_PORT', 3003);

    // Connect Kafka
    app.enableShutdownHooks(); // For correct disconnect from kafka
    app.connectMicroservice<MicroserviceOptions>(kafkaConsumers.productAnalyzerService);

    await app.startAllMicroservices();
    await app.listen(port);

    console.log("Application is running on: http://localhost:" + port);
}
bootstrap();
