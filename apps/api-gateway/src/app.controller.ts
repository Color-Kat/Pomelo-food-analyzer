import {PingContract} from "@app/kafka";
import {Controller, Get, Inject} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {ClientKafka, MessagePattern} from "@nestjs/microservices";
import {AppService} from './app.service';
import {ScanPhotoSubmitted} from "@app/contracts/scan/scan.photo-submitted";
import {ScanStatusChanged} from "@app/contracts/scan/scan.status-changed";
import {
    IngredientsRecognitionIngredientsRecognized
} from "@app/contracts/ingredients-recognition/ingredients-recognition.ingredients-recognized";

@Controller()
export class AppController {
    constructor(
        private readonly apiGatewayService: AppService,
        @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka,
        private readonly configService: ConfigService,
        // private readonly kafkaService: ClientKafka,
    ) {
    }

    @MessagePattern(PingContract.getTopic('api-gateway'))
    async handlePing(data: PingContract.Request) {
        return {
            status: 'ok',
            service: data.serviceName,
            requestTime: Date.now() - data.startTime + 'ms'
        };
    }

    @Get()
    getHello(): string {
        console.log(this.configService.get('KAFKA_BROKER'));
        return this.apiGatewayService.getHello();
    }

    @Get("pytest")
    pytest() {
        this.kafkaService.emit<void, ScanPhotoSubmitted.Payload>(ScanPhotoSubmitted.topic,{
            scanId: '123',
            photoUrl: 'https://cdn-irec.r-99.com/sites/default/files/imagecache/copyright/user-images/81829/x5R8ArElB9DgNb8Viiw.jpg'
        })
    }

    @MessagePattern(ScanStatusChanged.topic)
    async pytestStatuses(data: ScanStatusChanged.Payload) {
        console.log("Pytest, received data in api-gateway: ", data)
    }

    @MessagePattern(IngredientsRecognitionIngredientsRecognized.topic)
    async pytestResult(data: IngredientsRecognitionIngredientsRecognized.Payload) {
        console.log("Pytest, received data in api-gateway: ", data)
    }
}

