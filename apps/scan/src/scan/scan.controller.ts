import {Body, Controller, Post} from '@nestjs/common';
import {ScanService} from './scan.service';
import {ScanCreate} from "@app/contracts";

@Controller('scan')
export class ScanController {
    constructor(private readonly scanService: ScanService) {
    }

    @Post()
    create(@Body() createScanDto: ScanCreate.Request): ScanCreate.Response {
        return {
            result: this.scanService.create(createScanDto)
        };
    }

    // @Get()
    // findAll() {
    //   return this.scanService.findAll();
    // }
    //
    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.scanService.findOne(+id);
    // }
    //
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
