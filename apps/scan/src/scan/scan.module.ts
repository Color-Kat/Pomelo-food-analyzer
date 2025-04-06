import {Module} from '@nestjs/common';
import {ScanRepository} from "@scan/scan/scan.repository";
import {ScanController} from './scan.controller';
import {ScanService} from './scan.service';
import {S3Module} from "@app/s3";

@Module({
  imports: [
      S3Module,
  ],
  controllers: [ScanController],
  providers: [ScanService, ScanRepository],
})
export class ScanModule {}
