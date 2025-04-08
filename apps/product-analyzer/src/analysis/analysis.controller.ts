import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Controller, Get, Inject} from '@nestjs/common';
import {Cache} from "cache-manager";
import {AnalysisService} from './analysis.service';

@Controller("analysis")
export class AnalysisController {
    constructor(
        private readonly analysisService: AnalysisService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {
    }

    @Get('cache')
    async getCache() {
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
