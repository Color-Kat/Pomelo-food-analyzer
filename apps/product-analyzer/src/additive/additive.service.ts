import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {AdditiveRepository} from "@product-analyzer/additive/additive.repository";
import {Cache} from "cache-manager";

@Injectable()
export class AdditiveService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly additiveRepository: AdditiveRepository,
    ) {
    }

    getAll() {
        return this.additiveRepository.getAll();
    }

    async getByCode(code: string) {
        const additive = await this.additiveRepository.getOneByCode(code);
        if (!additive) throw new NotFoundException(`additive not found: ${code}`);

        return additive;
    }
}
