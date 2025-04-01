import {ScanCreate} from "@app/contracts";
import {Injectable, NotFoundException} from '@nestjs/common';
import {ScanEntity} from "@scan/scan/scan.entity";
import {ScanRepository} from "@scan/scan/scan.repository";

@Injectable()
export class ScanService {
    constructor(private readonly scanRepository: ScanRepository) {
    }

    findAll() {
        return this.scanRepository.getAll();
    }

    async findOne(id: string) {
        const scan = await this.scanRepository.getOne(id);
        if (!scan)
            throw new NotFoundException(`Скан с id=${id} не найден`);

        return scan;
    }

    async create(createScanDto: ScanCreate.Request) {
        const scanEntity = new ScanEntity(
            createScanDto
        );

        // scanEntity.setStatus(ScanStatus.PHOTO_UPLOADED);

        const result = await this.scanRepository.create(scanEntity);

        return result;
    }

    // update(id: number, updateScanDto: UpdateScanDto) {
    //   return `This action updates a #${id} scan`;
    // }
    //
    // remove(id: number) {
    //   return `This action removes a #${id} scan`;
    // }

    // private updateUser(
    //     userEntity: UserEntity
    // ) {
    //     return Promise.all([
    //         this.userEventEmitter.handle(userEntity),
    //         this.userRepository.updateUser(userEntity)
    //     ]);
    // }
}
