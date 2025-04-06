import {BadRequestException, Controller, Get, NotFoundException, Param, StreamableFile} from '@nestjs/common';
import {S3Service} from "@app/s3";

@Controller('storage')
export class StorageController {
    constructor(private readonly s3Service: S3Service) {}

    @Get('*path')
    async getFile(@Param('path') filePath: string) {
        filePath = filePath.replace(/,/, '/');

        if (!filePath) {
            throw new BadRequestException('File path is required after /storage/');
        }

        try {
            return await this.s3Service.getFileStream(filePath);
        } catch (error) {
            throw new NotFoundException(`File with path ${filePath} not found`);
        }
    }
}
