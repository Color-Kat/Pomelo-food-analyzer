import {DynamicModule, Global, Module} from '@nestjs/common';
import {ClientProviderOptions, ClientsModule, Transport} from "@nestjs/microservices";

@Global()
@Module({})
export class KafkaProducersModule {
    static register(clientId: string): DynamicModule {
        const kafkaClient: ClientProviderOptions = {
            name: 'KAFKA_SERVICE',
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId,
                    brokers: ['kafka:9092'],
                },
                producer: {
                    allowAutoTopicCreation: true,
                },
                // producerOnlyMode: true,
            },
        };

        return {
            module: KafkaProducersModule,
            imports: [ClientsModule.register([kafkaClient])],
            exports: [ClientsModule]
        };
    }
}
