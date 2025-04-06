import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import {ConfigModule} from "@app/config";

@Module({
  imports: [ConfigModule],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
