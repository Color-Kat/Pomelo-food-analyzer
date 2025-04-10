import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {Cache} from "cache-manager";
import {PrismaService} from "../database/prisma.service";
import {AdditivesType, IAdditive} from "@app/interfaces";
import {slug} from "@app/utils";

@Injectable()
export class AdditiveRepository implements OnModuleInit {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly prismaService: PrismaService,
    ) {
    }

    async onModuleInit() {
        // await this.populate();

        // Save the ENTIRE additives table to the in memory cache
        await this.getAll();

        await this.cacheManager.del("additives");
    }

    public async getAll(): Promise<AdditivesType> {
        return await this.cacheManager.wrap<Record<string, any>>(
            "additives",
            async () => {
                console.log('not cache');
                // Group the additives by code
                return (await this.prismaService.additive.findMany()).reduce<AdditivesType>(
                    (acc, additive) => {
                        acc[slug(additive.code)] = additive;
                        return acc;
                    }, {}
                );
            }
        )
    }

    public async getOneByCode(code: string) {
        // Get one additive by code from CACHE or DB for the first time
        const additives = await this.getAll();
        return additives[code] || null;
    }

    private async populate() {
        await this.prismaService.additive.createMany({
            data: [
                {
                    name: "E100 - Curcumin",
                    description: "Curcumin additive is a natural yellow pigment derived from turmeric. It is used as a colorant in food products.",
                    code: "E100",
                    danger: 0,
                    healthHarm: "Hz",
                    healthBenefit: "Hz",
                    usage: "Food coloring",
                    referenceUrl: ""
                },
                {
                    name: "E111 - shit",
                    description: "Shit additive is a natural brown pigment derived from poop. It is used as a colorant in food products.",
                    code: "E111",
                    danger: 5,
                    healthHarm: "Vomit",
                    healthBenefit: "Hz",
                    usage: "Food coloring",
                    referenceUrl: ""
                },
            ]
        });
    }
}
