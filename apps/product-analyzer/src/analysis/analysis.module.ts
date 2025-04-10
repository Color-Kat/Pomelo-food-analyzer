import { Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AnalysisController } from './analysis.controller';
import {FoodAnalyzerStrategy} from "@product-analyzer/analysis/strategies/food-analyzer.strategy";
import {CosmeticAnalyzerStrategy} from "@product-analyzer/analysis/strategies/cosmetic-analyzer.strategy";

@Module({
  controllers: [AnalysisController],
  providers: [
      AnalysisService,
      FoodAnalyzerStrategy,
      CosmeticAnalyzerStrategy
  ],
})
export class AnalysisModule {}
