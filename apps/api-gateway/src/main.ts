import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {kafkaConsumers} from "@app/kafka/kafka-consumers";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.port ?? 3000;

    // Connect Kafka
    app.enableShutdownHooks(); // For correct disconnect from kafka
    app.connectMicroservice<MicroserviceOptions>(kafkaConsumers.apiGatewayService);

    await app.startAllMicroservices();
    await app.listen(port);

    console.log("Application is running on: http://localhost:" + port);
}

bootstrap();
