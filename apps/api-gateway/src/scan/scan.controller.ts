import {Controller, Get} from '@nestjs/common';

@Controller('scan')
export class ScanController {
    @Get()
    addNewScan() {
        console.log('add new scan!!');
    }
}
