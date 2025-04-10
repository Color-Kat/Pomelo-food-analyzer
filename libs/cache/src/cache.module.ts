import {ConfigModule} from "@app/config";
import {createKeyv} from "@keyv/redis";
import {CacheModule as NestCacheModule} from "@nestjs/cache-manager";
import {Global, Module} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {CacheableMemory} from 'cacheable';
import Keyv from "keyv";

@Global()
@Module({
    imports: [
        NestCacheModule.registerAsync({
            isGlobal: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    stores: [
                        new Keyv({
                            store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
                        }),
                        createKeyv('redis://redis:6379'),
                    ],
                };
            },
        }),

        // NestCacheModule.register({
        //     store: redisStore,
        //     socket: {
        //         host: 'localhost',
        //         port: 6379,
        //     },
        //     isGlobal: true,
        //
        //     // host: 'redis',
        //     // port: 6379,
        //     // ttl : 48 * 60 * 60,
        // })
        //  -------

        // NestCacheModule.registerAsync({
        //     imports: [ConfigModule],
        //     inject: [ConfigService],
        //     useFactory: async (configService: ConfigService) => ({
        //         store: redisStore,
        //         host: configService.get('REDIS_HOST'),
        //         port: configService.get('REDIS_PORT'),
        //         ttl: configService.get('CACHE_TTL'),
        //     }),
        // }),


        // -----
        // NestCacheModule.registerAsync({
        //     isGlobal: true,
        //     imports: [ConfigModule],
        //     useFactory: async (configService: ConfigService) => {
        //         const store = await redisStore.create({
        //
        //             // host: configService.get<string>('REDIS_HOST'),
        //             // port: parseInt(configService.get<string>('REDIS_PORT')!),
        //             host: 'redis',
        //             port: 6379,
        //         });
        //         return {
        //             store: () => store,
        //         };
        //     },
        //     inject: [ConfigService],
        // })
    ],
    // exports: [
    //     // NestCacheModule,
    //     CACHE_MANAGER
    // ],
})
export class CacheModule {
}
