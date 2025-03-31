import {Module} from '@nestjs/common';
import {ScanRepository} from "@scan/scan/scan.repository";
import {ScanController} from './scan.controller';
import {ScanService} from './scan.service';

@Module({
  controllers: [ScanController],
  providers: [ScanService, ScanRepository],
})
export class ScanModule {}
