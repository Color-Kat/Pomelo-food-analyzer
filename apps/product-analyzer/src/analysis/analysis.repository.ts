import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {Cache} from "cache-manager";
import {PrismaService} from "../database/prisma.service";

@Injectable()
export class AnalysisRepository implements OnModuleInit {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly prismaService: PrismaService,
    ) {
    }

    async onModuleInit() {

    }
}
