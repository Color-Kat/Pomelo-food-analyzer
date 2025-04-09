import {Module} from '@nestjs/common';
import {AdditiveService} from './additive.service';
import {AdditiveController} from './additive.controller';
import {AdditiveRepository} from "@product-analyzer/additive/additive.repository";

@Module({
    controllers: [AdditiveController],
    providers: [AdditiveService, AdditiveRepository],
})
export class AdditiveModule {
}
