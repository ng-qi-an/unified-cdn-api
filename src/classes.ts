import type { UnifiedCDN } from "./index.js";
import deleteFile from "./methods/deleteFile.js";
import getFileContent from "./methods/getFileContent.js";
import renameFile from "./methods/renameFile.js";
import type { RawUnifiedCDNFile } from "./types.js";

export class UnifiedCDNFile {
    public readonly id: string;
    public readonly name: string;
    public readonly viewUrl: string;
    public readonly contentType: string;
    public readonly size: number;
    public readonly expiresAt: Date | null;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    constructor (private readonly options: RawUnifiedCDNFile, private readonly ucdn: UnifiedCDN) {
        this.id = this.options.id;
        this.name = this.options.name;
        this.viewUrl = `${ucdn.apiUrl}/files/${this.options.id}/view`;
        this.contentType = this.options.contentType;
        this.size = this.options.size;
        this.expiresAt = this.options.expiresAt ? new Date(this.options.expiresAt) : null;
        this.createdAt = new Date(this.options.createdAt);
        this.updatedAt = new Date(this.options.updatedAt);
    }
    async rename(newName: string) {
        return renameFile(this.ucdn, this.id, newName);
    }
    async delete(){
        return deleteFile(this.ucdn, this.id);
    }
    async getContent() {
        return getFileContent(this.ucdn, this.id);
    }
}