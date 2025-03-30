import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScanService } from './scan.service';
import {ScanAddScan} from "@app/contracts";

@Controller('scan')
export class ScanController {
  constructor(private readonly scanService: ScanService) {}

  @Post()
  create(@Body() createScanDto: ScanAddScan.Request): ScanAddScan.Response {
      return {
          result: "Super!"
      }
    // return this.scanService.create(createScanDto);
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
