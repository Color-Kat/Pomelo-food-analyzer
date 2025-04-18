import {ProductAnalyzerAnalyzed, ScanCreate, ScanGetScansByUserId, ScanUpdate} from "@app/contracts";
import {
    IngredientsRecognitionRecognized
} from "@app/contracts/ingredients-recognition/ingredients-recognition.recognized";
import {ScanGetScan} from "@app/contracts/scan/scan.get-scan";
import {ScanGetScans} from "@app/contracts/scan/scan.get-scans";
import {
    Body,
    Controller,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe, Patch,
    Post,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {EventPattern} from "@nestjs/microservices";
import {FileInterceptor} from "@nestjs/platform-express";
import {ScanService} from './scan.service';

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

    @Get(':scanId')
    async findOne(@Param('scanId') scanId: string): Promise<ScanGetScan.Response> {
        return {
            scan: await this.scanService.findOne(scanId)
        };
    }

    @Get('user/:userId')
    async getScansByUserId(@Param('userId') userId: string): Promise<ScanGetScansByUserId.Response> {
        return {
            scans: await this.scanService.findAllByUserId(userId)
        }
    }

    @Post()
    @UseInterceptors(FileInterceptor('photo'))
    async create(
        @Body() createScanDto: ScanCreate.Request,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({maxSize: 10 * 1024 * 1024}),
                    new FileTypeValidator({fileType: 'image/*'}),
                ],
            }),
        )
        photo: Express.Multer.File,
    ): Promise<ScanCreate.Response> {
        return {
            scan: await this.scanService.create(createScanDto, photo)
        };
    }

    @Patch(':scanId')
    async update(
        @Param('scanId') scanId: string,
        @Body() updateScanDto: ScanUpdate.Request
    ): Promise<ScanUpdate.Response> {
        return {
            scan: await this.scanService.update(scanId, updateScanDto)
        };
    }

    @EventPattern(IngredientsRecognitionRecognized.topic)
    async handleIngredientsRecognized(data: IngredientsRecognitionRecognized.Payload) {
        await this.scanService.handleIngredientsRecognized(data);
    }

    @EventPattern(ProductAnalyzerAnalyzed.topic)
    async handleAnalyzed(data: ProductAnalyzerAnalyzed.Payload) {
        await this.scanService.handleAnalyzed(data);
    }


    //
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.scanService.remove(+id);
    // }
}
