import {ScanCreate} from "@app/contracts";
import {ScanGetScan} from "@app/contracts/scan/scan.get-scan";
import {ScanGetScans} from "@app/contracts/scan/scan.get-scans";
import {Body, Controller, Get, Param, Post} from '@nestjs/common';
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

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ScanGetScan.Response> {
        return {
            scan: await this.scanService.findOne(id)
        };
    }

    @Post()
    async create(@Body() createScanDto: ScanCreate.Request): Promise<ScanCreate.Response> {
        return {
            scan: await this.scanService.create(createScanDto)
        };
    }

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
