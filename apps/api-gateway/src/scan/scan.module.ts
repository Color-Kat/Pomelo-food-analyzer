import { Module } from '@nestjs/common';
import { ScanController } from './scan.controller';
import {ScanService} from "@api-gateway/scan/scan.service";

@Module({
  controllers: [ScanController],
  providers: [ScanService],
})
export class ScanModule {}
