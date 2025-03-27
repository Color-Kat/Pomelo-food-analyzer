import {NestFactory} from "@nestjs/core";
import {ApiGatewayModule} from "./api-gateway.module";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
    const app = await NestFactory.create(ApiGatewayModule);
    const port = process.env.port ?? 3000;

    // Connect Kafka
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.KAFKA,
        options: {
            client: {
                brokers: ['kafka:9092'],
            },
            consumer: {
                groupId: 'api-gateway-consumer',
            },
        },
    });

    await app.startAllMicroservices();
    await app.listen(port);

    console.log("Application is running on: http://localhost:" + port);
}

bootstrap();
