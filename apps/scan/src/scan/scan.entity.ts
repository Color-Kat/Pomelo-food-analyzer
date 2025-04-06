import {IScan, ScanStatus, ScanType} from "@app/interfaces";
import {S3Service} from "@app/s3";

export class ScanEntity implements IScan {
    id: string;
    type: ScanType;
    status: ScanStatus;

    name: string;
    photoUrl: string;
    ingredients: string[];
    userId: string;

    createdAt?: Date;
    updatedAt?: Date;

    constructor(scan: Partial<IScan>) {
        if (scan.id) this.id = scan.id;
        this.type = scan.type || ScanType.FOOD;
        this.status = scan.status || ScanStatus.CREATED;
        this.userId = scan.userId || '';
        this.name = scan.name || '';
        this.photoUrl = scan.photoUrl || '';
        this.ingredients = scan.ingredients || [];
        this.createdAt = scan.createdAt || undefined
        this.updatedAt = scan.updatedAt || undefined;
    }

    public setStatus(status: ScanStatus) {
        this.status = status;
        return this;
    }

    /**
     * Upload photo to S3 storage and set photoUrl.
     * @param photo
     * @param s3Service
     */
    public async setPhoto(photo: Express.Multer.File, s3Service: S3Service) {
        const {url, filePath} = await s3Service.uploadFile(photo, "scans/");
        console.log(url, filePath);
        this.photoUrl = url;
    }
}
