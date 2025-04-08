import {Global, Module} from '@nestjs/common';
import {CacheModule as NestCacheModule} from "@nestjs/cache-manager";
import {redisStore} from "cache-manager-redis-store";

@Global()
@Module({
    imports: [
        NestCacheModule.register({
            store: redisStore,
            host: 'redis',
            port: 6379,
            ttl: 5 * 60,
        })
    ],
    exports: [NestCacheModule],
})
export class CacheModule {}
