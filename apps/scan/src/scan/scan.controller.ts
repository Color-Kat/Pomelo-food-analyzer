import {ScanCreate} from "@app/contracts";
import {ScanGetScan} from "@app/contracts/scan/scan.get-scan";
import {ScanGetScans} from "@app/contracts/scan/scan.get-scans";
import {
    Body,
    Controller, FileTypeValidator,
    Get, MaxFileSizeValidator,
    Param, ParseFilePipe,
    Post,
    UploadedFile, UseInterceptors
} from '@nestjs/common';
import {ScanService} from './scan.service';
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('scans')
export class ScanController {
    constructor(private readonly scanService: ScanService) {
    }

    @Get()
    async findAll(): Promise<ScanGetScans.Response> {
        return {
            scans: await this.scanService.findAll()
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ScanGetScan.Response> {
        return {
            scan: await this.scanService.findOne(id)
        };
    }

    @Post()
    @UseInterceptors(FileInterceptor('photo'))
    async create(
        @Body() createScanDto: ScanCreate.Request,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
                    new FileTypeValidator({ fileType: 'image/*' }),
                ],
            }),
        )
        photo: Express.Multer.File,
    ): Promise<ScanCreate.Response> {
        return {
            scan: await this.scanService.create(createScanDto, photo)
        };
    }

    // @EventPattern()







    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateScanDto: UpdateScanDto) {
    //   return this.scanService.update(+id, updateScanDto);
    // }
    //
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.scanService.remove(+id);
    // }
}
