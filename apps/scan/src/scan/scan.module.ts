import { Module } from '@nestjs/common';
import { ScanService } from './scan.service';
import { ScanController } from './scan.controller';

@Module({
  controllers: [ScanController],
  providers: [ScanService],
})
export class ScanModule {}
