import {ScanCreate} from "@app/contracts";
import {Injectable} from '@nestjs/common';
import {ScanRepository} from "@scan/scan/scan.repository";

@Injectable()
export class ScanService {
    constructor(private readonly scanRepository: ScanRepository) {
    }

    create(createScanDto: ScanCreate.Request) {
        return createScanDto.type;
    }

    findAll() {
        return this.scanRepository.getAll();
    }

    // findOne(id: number) {
    //   return `This action returns a #${id} scan`;
    // }
    //
    // update(id: number, updateScanDto: UpdateScanDto) {
    //   return `This action updates a #${id} scan`;
    // }
    //
    // remove(id: number) {
    //   return `This action removes a #${id} scan`;
    // }
}
