import {ProductAnalyzerAnalyzed, ScanCreate, ScanUpdate} from "@app/contracts";
import {
    IngredientsRecognitionRecognized
} from "@app/contracts/ingredients-recognition/ingredients-recognition.recognized";
import {ScanIngredientsChanged} from "@app/contracts/scan/scan.ingredients-changed";
import {ScanPhotoSubmitted} from "@app/contracts/scan/scan.photo-submitted";
import {ScanStatusChanged} from "@app/contracts/scan/scan.status-changed";
import {ScanStatus} from "@app/interfaces";
import {S3Service} from "@app/s3";
import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {ClientKafka} from "@nestjs/microservices";
import {ScanEntity} from "@scan/scan/scan.entity";
import {ScanRepository} from "@scan/scan/scan.repository";
import {firstValueFrom} from "rxjs";

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

    async findOne(scanId: string) {
        const scan = await this.scanRepository.findOne(scanId);
        if (!scan)
            throw new NotFoundException(`Скан с id=${scanId} не найден`);

        return scan;
    }

    findAllByUserId(userId: string) {
        return this.scanRepository.findAllByUserId(userId);
    }

    async create(
        createScanDto: ScanCreate.Request,
        photo: Express.Multer.File
    ) {
        const scanEntity = new ScanEntity(
            createScanDto
        );

        // Upload file to S3 and set photo URL
        // const {url: photoUrl, filePath} = await this.s3Service.uploadFile(photo, "scans/");
        // await scanEntity.setPhoto(photoUrl);

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

    async handleAnalyzed(data: ProductAnalyzerAnalyzed.Payload) {
        const scan = await this.scanRepository.findOne(data.scanId);
        if (!scan) throw new NotFoundException(`Скан с id=${data.scanId} не найден`);

        const scanEntity = new ScanEntity(scan);

        scanEntity.setStatus(ScanStatus.COMPLETED);
        // scanEntity.setAnalysisResult(data.ingredients);

        await this.scanRepository.update(scanEntity);

        this.kafkaService.emit<void, ScanStatusChanged.Payload>(ScanStatusChanged.topic, {
            scanId: scan.id,
            status: ScanStatusChanged.StatusEnum.COMPLETED,
        });
    }

    async update(scanId: string, updateScanDto: ScanUpdate.Request) {
        const scan = await this.scanRepository.findOne(scanId);
        if (!scan) throw new NotFoundException(`Скан с id=${scanId} не найден`);

        const scanEntity = new ScanEntity(scan)
            .setName(updateScanDto.name)
            .setType(updateScanDto.type)
            .setIngredients(updateScanDto.ingredients)
        ;

        // If ingredients changed,
        // then reanalyze them
        if(updateScanDto.ingredients) {
            scanEntity.setStatus(ScanStatus.RECOGNIZED);

            // Change status
            await firstValueFrom(this.kafkaService.emit<void, ScanStatusChanged.Payload>(ScanStatusChanged.topic, {
                scanId: scanEntity.id,
                status: ScanStatusChanged.StatusEnum.ANALYSIS_PENDING,
            }));

            // Send data to product-analyzer microservice
            await firstValueFrom(this.kafkaService.emit<void, ScanIngredientsChanged.Payload>(ScanIngredientsChanged.topic, {
                scanId  : scanEntity.id,
                type    : scanEntity.type,
                ingredients: scanEntity.ingredients
            }));
        }

        // If type is updated, but ingredients is not,
        // then we must rerun text recognition on image based on new scan.type
        if(updateScanDto.type && !updateScanDto.ingredients) {
            scanEntity.setStatus(ScanStatus.CREATED);

            // Change status
            await firstValueFrom(this.kafkaService.emit<void, ScanStatusChanged.Payload>(ScanStatusChanged.topic, {
                scanId: scanEntity.id,
                status: ScanStatusChanged.StatusEnum.RECOGNITION_PENDING,
            }));

            // Send data to OCR microservice
            await firstValueFrom(this.kafkaService.emit<void, ScanPhotoSubmitted.Payload>(ScanPhotoSubmitted.topic, {
                scanId  : scanEntity.id,
                type    : scanEntity.type,
                photoUrl: scanEntity.photoUrl,
            }));
        }

        // Update record in database
        const updatedScan = await this.scanRepository.update(scanEntity);

        return updatedScan;
    }

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
