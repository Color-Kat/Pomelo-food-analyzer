import {ScanCreate} from "@app/contracts";
import {
    IngredientsRecognitionRecognized
} from "@app/contracts/ingredients-recognition/ingredients-recognition.recognized";
import {ScanPhotoSubmitted} from "@app/contracts/scan/scan.photo-submitted";
import {ScanStatusChanged} from "@app/contracts/scan/scan.status-changed";
import {ScanStatus} from "@app/interfaces";
import {S3Service} from "@app/s3";
import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {ClientKafka} from "@nestjs/microservices";
import {ScanEntity} from "@scan/scan/scan.entity";
import {ScanRepository} from "@scan/scan/scan.repository";
import {firstValueFrom} from "rxjs";
import {ScanIngredientsChanged} from "@app/contracts/scan/scan.ingredients-changed";

@Injectable()
export class ScanService {
    constructor(
        private readonly scanRepository: ScanRepository,
        private readonly s3Service: S3Service,
        @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka,
    ) {
    }

    findAll() {
        return this.scanRepository.getAll();
    }

    async findOne(id: string) {
        const scan = await this.scanRepository.findOne(id);
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

        // Upload file to S3 and set photo URL
        const {url: photoUrl, filePath} = await this.s3Service.uploadFile(photo, "scans/");
        await scanEntity.setPhoto(photoUrl);

        // Save scan to db
        const result = await this.scanRepository.create(scanEntity);
        scanEntity.id = result.id;


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

        // Use setTimeout to delay the emission of the event
        // To client will be able to subscribe to SSE scan status updates.
        setTimeout(async () => {
            await firstValueFrom(this.kafkaService.emit<void, ScanStatusChanged.Payload>(ScanStatusChanged.topic, {
                scanId: scanEntity.id,
                status: ScanStatusChanged.StatusEnum.RECOGNITION_PENDING,
            }));

            this.kafkaService.emit<void, ScanPhotoSubmitted.Payload>(ScanPhotoSubmitted.topic, {
                scanId  : scanEntity.id,
                type    : scanEntity.type,
                photoUrl: scanEntity.photoUrl,
            });
        }, 50);

        return result;
    }

    async handleIngredientsRecognized(data: IngredientsRecognitionRecognized.Payload) {
        const scan = await this.scanRepository.findOne(data.scanId);
        if (!scan) throw new NotFoundException(`Скан с id=${data.scanId} не найден`);

        const scanEntity = new ScanEntity(scan);

        scanEntity.setStatus(ScanStatus.RECOGNIZED);
        scanEntity.setIngredients(data.ingredients);

        await this.scanRepository.update(scanEntity);

        this.kafkaService.emit<void, ScanStatusChanged.Payload>(ScanStatusChanged.topic, {
            scanId: scan.id,
            status: ScanStatusChanged.StatusEnum.ANALYSIS_PENDING,
        });

        this.kafkaService.emit<void, ScanIngredientsChanged.Payload>(ScanIngredientsChanged.topic, {
            scanId: scan.id,
            type: scan.type,
            ingredients: scan.ingredients
        });
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
