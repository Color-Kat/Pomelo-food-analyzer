import {IScan} from "@app/interfaces";
import {Injectable} from '@nestjs/common';
import {PrismaService} from "@scan/database/prisma.service";
import {ScanEntity} from "@scan/scan/scan.entity";

@Injectable()
export class ScanRepository {
    constructor(private readonly prismaService: PrismaService) {
    }

    async getAll() {
        return this.prismaService.scan.findMany() as Promise<IScan[]>;
    }

    async getOne(id: string) {
        return this.prismaService.scan.findUnique({
            where: {
                id
            }
        }) as Promise<IScan>;
    }

    async create(data: ScanEntity) {
        return this.prismaService.scan.create({
            data
        }) as Promise<IScan>;
    }
}
