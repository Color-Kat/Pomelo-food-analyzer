import {Module} from '@nestjs/common';
import {ConfigModule as NestConfigModule} from '@nestjs/config';
import * as Joi from 'joi';

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                // Postgresql settings
                DB_USER: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_NAME: Joi.string().required(),
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.number().port().required(),

                // Ports for microservices
                API_GATEWAY_PORT: Joi.number().port().default(3000),
                WEB_PORT: Joi.number().port().default(8000),
                ACCOUNT_PORT: Joi.number().port().default(3001),
                SCAN_PORT: Joi.number().port().default(3002),
                PRODUCT_ANALYZER_PORT: Joi.number().port().default(3003),
                INGREDIENTS_RECOGNITION_PORT: Joi.number().port().default(3010),

                // Kafka
                KAFKA_BROKER: Joi.string().required(),
            }),
            validationOptions: {
                abortEarly: false, // Показывать все ошибки валидации, а не первую
            },
        })
    ],
    exports: [NestConfigModule],
})

export class ConfigModule {
}
