import {ScanCreate} from "@app/contracts";
import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {ScanEntity} from "@scan/scan/scan.entity";
import {ScanRepository} from "@scan/scan/scan.repository";
import {ClientKafka} from "@nestjs/microservices";
import {ScanStatusChanged} from "@app/contracts/scan/scan.status-changed";
import {ScanStatus} from "@app/interfaces";

@Injectable()
export class ScanService {
    constructor(
        private readonly scanRepository: ScanRepository,
        @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka,
    ) {
    }

    findAll() {
        this.kafkaService.emit<void, ScanStatusChanged.Response>(ScanStatusChanged.topic, {
            status: Math.random() > 0.5 ? ScanStatus.ANALYZING : ScanStatus.STARTED,
            id: 'cm8yplg2f0000pfj0tcjvhx94'
        })
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
