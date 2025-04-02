import {ScanCreate} from "@app/contracts";
import {ScanStatusChanged} from "@app/contracts/scan/scan.status-changed";
import {ScanStatus} from "@app/interfaces";
import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {ClientKafka} from "@nestjs/microservices";
import {ScanEntity} from "@scan/scan/scan.entity";
import {ScanRepository} from "@scan/scan/scan.repository";

@Injectable()
export class ScanService {
    constructor(
        private readonly scanRepository: ScanRepository,
        @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka,
    ) {
    }

    /**
     * Transfer updated scan status to the client using kafka and SSE in api-gateway
     */
    emitScanStatusChanged(scanId: string, status: ScanStatus) {
        this.kafkaService.emit<void, ScanStatusChanged.Response>(ScanStatusChanged.topic, {
            status: status,
            id: scanId
        });
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

        const result = await this.scanRepository.create(scanEntity);
        scanEntity.id = result.id;

        // Mock status change
        setInterval(() => {
            switch (scanEntity.status) {
                case ScanStatus.STARTED:
                    scanEntity.setStatus(ScanStatus.PHOTO_UPLOADED);
                    break;
                case ScanStatus.PHOTO_UPLOADED:
                    scanEntity.setStatus(ScanStatus.RECOGNIZING);
                    break;
                case ScanStatus.RECOGNIZING:
                    scanEntity.setStatus(ScanStatus.ANALYZING);
                    break;
                case ScanStatus.ANALYZING:
                    scanEntity.setStatus(ScanStatus.COMPLETED);
                    break;
            }

            this.emitScanStatusChanged(scanEntity.id, scanEntity.status);
        }, 1000)

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
