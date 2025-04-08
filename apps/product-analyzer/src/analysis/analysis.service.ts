import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {Cache} from "cache-manager";
import {PrismaService} from "../database/prisma.service";

@Injectable()
export class AnalysisService implements OnModuleInit {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly prismaService: PrismaService,
    ) {
    }

    async onModuleInit() {
        // await this.prismaService.additive.createMany({
        //     data: [
        //         {
        //             name         : "E100 - Curcumin",
        //             description  : "Curcumin additive is a natural yellow pigment derived from turmeric. It is used as a colorant in food products.",
        //             code         : "E100",
        //             danger       : 0,
        //             healthHarm   : "Hz",
        //             healthBenefit: "Hz",
        //             usage        : "Food coloring",
        //             referenceUrl : ""
        //         },
        //         {
        //             name         : "E111 - shit",
        //             description  : "Shit additive is a natural brown pigment derived from poop. It is used as a colorant in food products.",
        //             code         : "E111",
        //             danger       : 5,
        //             healthHarm   : "Vomit",
        //             healthBenefit: "Hz",
        //             usage        : "Food coloring",
        //             referenceUrl : ""
        //         },
        //     ]
        // });

        // Save the ENTIRE additives table to the in memory cache
        const additives = await this.prismaService.additive.findMany();
        await this.cacheManager.set("additives", additives);
    }

}
