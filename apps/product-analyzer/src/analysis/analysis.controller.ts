import {Controller, Get, Inject} from '@nestjs/common';
import {AnalysisService} from './analysis.service';
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";

@Controller()
export class AnalysisController {
    constructor(
        private readonly analysisService: AnalysisService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {
    }

    @Get('cache')
    async getCache() {
        return this.cacheManager.wrap()
    }
}
