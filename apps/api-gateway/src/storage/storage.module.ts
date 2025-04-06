import { Module } from '@nestjs/common';
import {S3Module} from "@app/s3";
import {StorageController} from "@api-gateway/storage/storage.controller";

@Module({
    imports: [S3Module],
    controllers: [StorageController],
})
export class StorageModule {}
