import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {MicroserviceOptions} from "@nestjs/microservices";
import {kafkaConsumers} from "@app/kafka";
import {ConfigService} from "@nestjs/config";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const port = configService.get<number>('API_GATEWAY_PORT', 3002);

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    // Connect Kafka
    app.connectMicroservice<MicroserviceOptions>(kafkaConsumers.apiGatewayService);
    // app.enableShutdownHooks(); // For correct disconnect from kafka (significantly slow down reconnect)

    await app.startAllMicroservices();
    await app.listen(port);

    console.log("Application is running on: http://localhost:" + port);
}

bootstrap();
