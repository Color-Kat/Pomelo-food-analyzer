import {microserviceUrls} from "@app/config";
import {kafkaConsumers} from "@app/kafka";
import {ValidationPipe} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {NestFactory} from "@nestjs/core";
import {MicroserviceOptions} from "@nestjs/microservices";
import {AxiosHttpExceptionFilter} from "../filters/axios-http-exception.filter";
import {AppModule} from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const port = configService.get<number>('API_GATEWAY_PORT', 3002);

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalFilters(new AxiosHttpExceptionFilter());
    app.enableCors({
        origin: [microserviceUrls.web, 'http://localhost:8000'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    // Connect Kafka
    app.connectMicroservice<MicroserviceOptions>(
        kafkaConsumers.apiGatewayService,
        { inheritAppConfig: true } // To enable interceptors for microservice
    );
    // app.enableShutdownHooks(); // For correct disconnect from kafka (significantly slow down reconnect)

    await app.startAllMicroservices();
    await app.listen(port);

    console.log("Application is running on: http://localhost:" + port);
}

bootstrap();
