import deleteFile from "./methods/deleteFile.js";
import getFileContent from "./methods/getFileContent.js";
import renameFile from "./methods/renameFile.js";
import type { FlexibleAPI, RawUnifiedCDNFile } from "./types.js";

export class UnifiedCDNFile {
    public readonly id: string;
    public readonly name: string;
    public readonly viewUrl: string;
    public readonly contentType: string;
    public readonly size: number;
    public readonly expiresAt: Date | null;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly details: RawUnifiedCDNFile;

    constructor (private readonly options: RawUnifiedCDNFile, private readonly api: FlexibleAPI) {
        this.id = this.options.id;
        this.name = this.options.name;
        this.viewUrl = `${this.api?.apiUrl || process.env.UNIFIED_CDN_API_URL}/api/files/${this.options.id}/view`;
        this.contentType = this.options.contentType;
        this.size = this.options.size;
        this.expiresAt = this.options.expiresAt ? new Date(this.options.expiresAt) : null;
        this.createdAt = new Date(this.options.createdAt);
        this.updatedAt = new Date(this.options.updatedAt);
        this.details = this.options;
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            viewUrl: this.viewUrl,
            contentType: this.contentType,
            size: this.size,
            expiresAt: this.expiresAt,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            details: this.details,
        }
    }
    async rename(newName: string) {
        return renameFile(this.id, newName, this.api);
    }
    async delete(){
        return deleteFile(this.id, this.api);
    }
    async getContent() {
        return getFileContent(this.id, this.api);
    }
}
