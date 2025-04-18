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

    async findOne(id: string) {
        return this.prismaService.scan.findUnique({
            where: {
                id
            }
        }) as Promise<IScan>;
    }

    async findAllByUserId(userId: string) {
        return this.prismaService.scan.findMany({
            where: {
                userId: userId
            }
        }) as Promise<IScan[]>;
    }

    async create(data: ScanEntity) {
        return this.prismaService.scan.create({
            data
        }) as Promise<IScan>;
    }

    async update(data: ScanEntity) {
        return this.prismaService.scan.update({
            where: {id: data.id},
            data
        }) as Promise<IScan>;
    }

    async delete(data: ScanEntity) {
        return this.prismaService.scan.delete({
            where: {id: data.id},
        });
    }
}
