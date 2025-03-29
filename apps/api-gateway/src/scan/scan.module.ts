import { Module } from '@nestjs/common';
import { ScanController } from './scan.controller';

@Module({
  controllers: [ScanController]
})
export class ScanModule {}
