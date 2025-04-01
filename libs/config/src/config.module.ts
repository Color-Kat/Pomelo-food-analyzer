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
                DB_HOST: Joi.string().required(),
                SCAN_DB_NAME: Joi.string().required(),
                PRODUCT_ANALYZER_DB_NAME: Joi.string().required(),
                ACCOUNT_DB_NAME: Joi.string().required(),

                // Ports and URLs of all microservices
                WEB_HOST: Joi.string().uri().required(),
                WEB_PORT: Joi.number().port().required(),
                API_GATEWAY_HOST: Joi.string().uri().required(),
                API_GATEWAY_PORT: Joi.number().port().required(),
                ACCOUNT_HOST: Joi.string().uri().required(),
                ACCOUNT_PORT: Joi.number().port().required(),
                SCAN_HOST: Joi.string().uri().required(),
                SCAN_PORT: Joi.number().port().required(),
                PRODUCT_ANALYZER_HOST: Joi.string().uri().required(),
                PRODUCT_ANALYZER_PORT: Joi.number().port().required(),
                INGREDIENTS_RECOGNITION_HOST: Joi.string().uri().required(),
                INGREDIENTS_RECOGNITION_PORT: Joi.number().port().required(),

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
