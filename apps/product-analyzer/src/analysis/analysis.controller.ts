import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Controller, Get, Inject} from '@nestjs/common';
import {PrismaService} from "@product-analyzer/database/prisma.service";
import {Cache} from "cache-manager";
import {AnalysisService} from './analysis.service';

@Controller("analysis")
export class AnalysisController {
    constructor(
        private readonly analysisService: AnalysisService,
        private readonly prismaService: PrismaService,
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
}
