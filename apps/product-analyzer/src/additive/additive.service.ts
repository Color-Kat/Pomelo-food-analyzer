import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {Cache} from "cache-manager";
import {AdditiveRepository} from "@product-analyzer/additive/additive.repository";

@Injectable()
export class AdditiveService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly additiveRepository: AdditiveRepository,
    ) {
    }

    public getAll() {
        return this.additiveRepository.getAll();
    }

    public getByCode(code: string) {
        return this.additiveRepository.getOneByCode(code);
    }
}
