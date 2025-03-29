import {DynamicModule, Global, Module} from '@nestjs/common';
import {ClientProviderOptions, ClientsModule, Transport} from "@nestjs/microservices";
import {KafkaController} from "@app/kafka/kafka.controller";
import {kafkaAddress} from "@app/kafka/config";

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
                    brokers: [kafkaAddress],
                },
                producer: {
                    allowAutoTopicCreation: true,
                    // createPartitioner: Partitioners.LegacyPartitioner
                },
                // consumer: {
                //     groupId: `${serviceName}-consumer`,
                // },
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
