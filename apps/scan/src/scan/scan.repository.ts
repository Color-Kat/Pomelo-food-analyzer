import {Injectable} from '@nestjs/common';
import {PrismaService} from "@scan/database/prisma.service";

@Injectable()
export class ScanRepository {
    constructor(private readonly prismaService: PrismaService) {
    }

    async getAll() {
        return this.prismaService.scan.findMany();
    }
}
