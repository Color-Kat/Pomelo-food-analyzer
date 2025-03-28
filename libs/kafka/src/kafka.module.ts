import {DynamicModule, Global, Module} from '@nestjs/common';
import {ClientProviderOptions, ClientsModule, Transport} from "@nestjs/microservices";
import {KafkaController} from "@app/kafka/kafka.controller";

@Global()
@Module({})
export class KafkaModule {
    static register(serviceName: string): DynamicModule {
        const kafkaClient: ClientProviderOptions = {
            name: 'KAFKA_SERVICE',
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: `${serviceName}-producer`,
                    brokers: ['kafka:9092'],
                },
                producer: {
                    allowAutoTopicCreation: true,
                },
                consumer: {
                    groupId: `${serviceName}-consumer`,
                },
            },
        };

        return {
            module: KafkaModule,
            imports: [ClientsModule.register([kafkaClient])],
            controllers: [KafkaController],
            exports: [ClientsModule]
        };
    }
}
