import {ScanCreate} from "@app/contracts";
import {ScanStatusChanged} from "@app/contracts/scan/scan.status-changed";
import {ScanStatus} from "@app/interfaces";
import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {ClientKafka} from "@nestjs/microservices";
import {ScanEntity} from "@scan/scan/scan.entity";
import {ScanRepository} from "@scan/scan/scan.repository";
import {ScanPhotoSubmitted} from "@app/contracts/scan/scan.photo-submitted";

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
        this.kafkaService.emit<void, ScanStatusChanged.Payload>(ScanStatusChanged.topic, {
            status: status,
            scanId: scanId
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

    async create(
        createScanDto: ScanCreate.Request,
        photo: Express.Multer.File
    ) {
        const scanEntity = new ScanEntity(
            createScanDto
        );

        scanEntity.setPhoto(photo);

        // scanEntity.photoUrl = "https://cdn-irec.r-99.com/sites/default/files/imagecache/copyright/user-images/81829/x5R8ArElB9DgNb8Viiw.jpg";

        console.log(scanEntity)

        return {} as any;

        // const result = await this.scanRepository.create(scanEntity);
        // scanEntity.id = result.id;

        // Mock status change
        // setInterval(() => {
        //     switch (scanEntity.status) {
        //         case ScanStatus.CREATED:
        //             scanEntity.setStatus(ScanStatus.RECOGNIZING);
        //             break;
        //         case ScanStatus.RECOGNIZING:
        //             scanEntity.setStatus(ScanStatus.ANALYZING);
        //             break;
        //         case ScanStatus.ANALYZING:
        //             scanEntity.setStatus(ScanStatus.COMPLETED);
        //             break;
        //     }
        //
        //     this.emitScanStatusChanged(scanEntity.id, scanEntity.status);
        // }, 1000)

        // this.kafkaService.emit<void, ScanPhotoSubmitted.Payload>(ScanPhotoSubmitted.topic, {
        //     scanId: scanEntity.id,
        //     photoUrl: scanEntity.photoUrl,
        // })
        //
        // return result;
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
