import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Controller, Get, Inject, Param} from '@nestjs/common';
import {Cache} from "cache-manager";
import {AdditiveService} from './additive.service';

@Controller("additives")
export class AdditiveController {
    constructor(
        private readonly additiveService: AdditiveService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {
    }

    @Get('cache')
    async getCache() {
        console.time('OperationTime');
        // await this.cacheManager.set("a", "a");
        const result = await this.cacheManager.get("a");
        // const result = await this.prismaService.additive.findMany();
        console.timeEnd('OperationTime');
        console.log(result)
        return result;

        return this.cacheManager.wrap(
            "test",
            async () => {
                console.log("This is not cached value")
                return "test";
            },
            {ttl: 10000,}
        )
    }

    @Get('')
    async getAll() {
        return this.additiveService.getAll();
    }

    @Get(':code')
    async getByCode(@Param('code') code: string) {
        return this.additiveService.getByCode(code);
    }
}
