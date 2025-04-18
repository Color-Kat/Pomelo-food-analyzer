import {IScan, ScanStatus, ScanType} from "@app/interfaces";

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

    public setStatus(status?: ScanStatus) {
        if(!status) return this;
        this.status = status;
        return this;
    }

    public setType(type?: ScanType) {
        if(!type) return this;
        this.type = type;
        return this;
    }

    public setPhoto(url?: string) {
        if(!url) return this;
        this.photoUrl = url;
        return this;
    }

    public setName(name?: string) {
        if(!name) return this;
        this.name = name;
        return this;
    }

    public setIngredients(ingredients?: string[]) {
        if(!ingredients) return this;
        this.ingredients = ingredients;
        return this;
    }
}
