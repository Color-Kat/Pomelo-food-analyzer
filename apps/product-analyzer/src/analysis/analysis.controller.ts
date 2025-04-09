import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Controller, Get, Inject} from '@nestjs/common';
import {PrismaService} from "@product-analyzer/database/prisma.service";
import {Cache} from "cache-manager";
import {AnalysisService} from './analysis.service';
import {EventPattern} from "@nestjs/microservices";
import {
    IngredientsRecognitionRecognized
} from "@app/contracts/ingredients-recognition/ingredients-recognition.recognized";
import {ScanIngredientsChanged} from "@app/contracts/scan/scan.ingredients-changed";
import {ScanType} from "@app/interfaces";

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

    @EventPattern(ScanIngredientsChanged.topic)
    handleIngredientsRecognized(data: ScanIngredientsChanged.Payload) {
        this.analysisService.handleScan(data);
    }
}
